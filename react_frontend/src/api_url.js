
// userRegister (post method)
export const userRegisterUrl = "http://localhost:8000/user/register"

// userLogin (post method)
export const userLoginUrl = "http://localhost:8000/user/login"

// all topics (get method)
export const showTopicUrl = "http://localhost:8000/topic/show-topics"

// single topic by Id (get method)
export const singleTopicUrl = "http://localhost:8000/topic/show-topic"

// post comment by user (post method)
export const postCommUrl =  "http://localhost:8000/opinion/post-comm"

// show comment with topicId (get method, token required)
export const showCommentUrl = "http://localhost:8000/opinion/show-comments" //{topicId}

// show comment with userId (get method, token required)
export const showUserCommentUrl = "http://localhost:8000/opinion/show-comment" //{opinionId}