
import Stripe from "stripe";
import { ErrorProcessor } from "../../../lib/ErrorProcessor";
import { envVariables } from "../../../../config/environment_variables";

const stripe = new Stripe(envVariables.stripeKey);

const name = "shoaib";

const stripeSessions = new Map();
console.log("stripeSessionMap");

export default {

    async createStripeSession(ctx: any) {

        console.log("create stripe session");

        try {
            const user = ctx.state.user;

            const { courseId } = ctx.request.body;

            if (!courseId) {
                return ctx.badRequest("Course id is required.");
            }

            // Fetch course
            const course = await strapi.db.query("api::course.course").findOne({
                where: {
                    id: Number(courseId),
                },
            });

            if (!course) {
                return ctx.notFound("Course not found.");
            }

            const session = await stripe.checkout.sessions.create({

                mode: "payment",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {

                            currency: "usd",

                            product_data: {
                                name: course.title as string,
                                description: course.description ?? "Description" as string,
                            },

                            unit_amount: Math.round(Number(course.price) * 100),
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${envVariables.frontendUrl}/payment/success?stripe_session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${envVariables.frontendUrl}/courses/${course.id}`,
                metadata: {
                    courseId: course.id,
                    userId: user.id,
                },
            });

            ctx.body = {
                payment_url: session.url,
            };
        }
        catch (err: any) {
            return ctx.internalServerError(ErrorProcessor(err));
        }
    },

    async paymentVerify(ctx: any) {

        console.log("payment verification")

        try {
            const user = ctx.state.user;

            const { stripeSessionId } = ctx.request.body;

            if (!stripeSessionId) {
                return ctx.badRequest("Stripe Session ID is required.");
            }

            const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

            if (!session) {
                return ctx.notFound("Checkout session not found.");
            }

            const userId = Number(session.metadata?.userId ?? -1);
            const courseId = Number(session.metadata?.courseId ?? -1);

            if (!userId || !courseId)
                return ctx.forbidden("Missing session data");

            if (userId !== user.id) {
                return ctx.forbidden("Invalid User.");
            }

            if (session.payment_status !== "paid") {
                return ctx.badRequest("Payment has not been successful.");
            }

            let payment = await strapi.db.query("api::payment.payment").findOne({
                where: {
                    transactionId: session.payment_intent,
                }
            })

            if (payment) {
                ctx.body = {
                    message: "Enrolled successfully",
                    payment
                };
                return;
            }

            payment = await strapi.db
                .query("api::payment.payment")
                .create({
                    data: {
                        provider: "stripe",
                        sessionId: session.id,
                        transactionId: session.payment_intent,
                        paidAmount: session.amount_total ?? 0 / 100,
                        paymentStatus: "paid",
                    },
                });

            let enrollment = await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .create({
                    data: {
                        student: user.id,
                        course: courseId,
                        completedLessons: {},
                        transactionId: session.payment_intent,
                        quizResults: {},
                        completed: false,
                        payment: payment.id,
                    },
                });

            await strapi.db
                .query("api::payment.payment")
                .update({
                    where: {
                        id: payment.id,
                    },
                    data: {
                        course_enrollment: enrollment.id,
                    },
                });

            ctx.body = {
                message: "Enrolled successfully",
                payment
            };

        } catch (error: any) {
            return ctx.internalServerError(ErrorProcessor(error));
        }
    },
};

