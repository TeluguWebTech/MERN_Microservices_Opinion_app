
const {Kafka} = require("kafkajs")

const kafka = new Kafka({
    clientId:"opinion-service",
    brokers:[process.env.KAFKA_BROKER || "localhost:29092"]
})

const producer = kafka.producer()

const connectProducer = async()=>{
    await producer.connect()
    console.log("Kafka producer connected")
}

module.exports = {producer, connectProducer}