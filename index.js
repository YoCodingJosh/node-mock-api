const fastify = require('fastify')({ logger: true });
const PORT = process.env.PORT || 3000;

fastify.get("/ping", async (request, reply) => {
  reply.send({ pong: "it worked!" });
});

fastify.post("/mock", async (request, reply) => {
  if (!request.body || !request.body.message) {
    reply.code(400).send({ error: "Message is required" });
  }

  let message = request.body.message;

  let startingCase = Math.random() > 0.5 ? "upper" : "lower";

  let mockingMessage = '';

  for (var i = 0; i < message.length; i++) {
    if (startingCase === "upper") {
      mockingMessage += message[i].toUpperCase();
      startingCase = "lower";
    } else {
      mockingMessage += message[i].toLowerCase();
      startingCase = "upper";
    }
  }

  return { message: mockingMessage };
});

const start = async () => {
  try {
    console.log(`Server listening on port ${PORT}`);
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
