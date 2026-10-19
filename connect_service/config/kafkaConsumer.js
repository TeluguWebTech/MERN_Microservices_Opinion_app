
const {kafka, TOPIC} = require("./kafka")

const startConsumer = async()=>{
    const consumer = kafka.consumer({
        groupId: "opinion-event-consumer"
    })
    await consumer.connect()
    console.log("Kafka consumer connected")

    await consumer.subscribe({
        topic:TOPIC,
        fromBeginning:true
    })

    await consumer.run({
        eachMessage: async({topic, partition, message})=>{
            const value = message.value? message.value.toString(): ""

            console.log("\\n ----Kafka event recieved")
            console.log("Topic:", topic)
            console.log("Partition:", partition)

            try {
                    console.log("Event", JSON.parse(value))
            } catch (error) {
                console.log("Message: ", value)
            }
        }
    })
    return consumer
}

module.exports = {startConsumer}