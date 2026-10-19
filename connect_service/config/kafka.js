

const {Kafka} = require("kafkajs")

const kafka = new Kafka({
    clientId:"opinion-service",
    brokers:[process.env.KAFKA_BROKER || "localhost:29092"]
})

const TOPIC = "opinion.created"



module.exports = {kafka, TOPIC}