import { ENV_VAR } from "../../../../config/environment_variables";
import Stripe from "stripe";
import { ErrorProcessor } from "../../../lib/ErrorProcessor";
const stripe = new Stripe(ENV_VAR.STRIPE_KEY);

export default {

    async createStripeSession(ctx: any) {

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
                success_url: `${ENV_VAR.FRONTEND_URL}/payment/success?stripe_session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${ENV_VAR.FRONTEND_URL}/courses/${course.id}`,
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

            // Check course exists
            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: courseId,
                    },
                });

            if (!course) {
                return ctx.notFound("Course not found.");
            }

            let enrollment = await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .create({
                    data: {
                        student: user.id,
                        course: course.id,
                        completedLessons: {},
                        quizResults: {},
                    },
                });

            const payment = await strapi.db
                .query("api::payment.payment")
                .create({
                    data: {
                        course_enrollment: enrollment.id,
                        provider: "stripe",
                        sessionId: session.id,
                        transactionId: session.payment_intent,
                        paidAmount: session.amount_total ?? 0 / 100,
                        paymentStatus: "paid",
                    },
                });

            await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .update({
                    where: {
                        id: enrollment.id,
                    },
                    data: {
                        payment: payment.id,
                    },
                });

            ctx.body = {
                message: "enrolled successfully"
            };

        } catch (error: any) {
            return ctx.internalServerError(ErrorProcessor(error));
        }
    },


};

