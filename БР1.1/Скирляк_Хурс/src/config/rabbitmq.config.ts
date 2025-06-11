export default (): {
  rabbitmq: {
    uri: string;
    queues: {
      userService: string;
      authService: string;
      movieDataService: string;
      movieMatchingService: string;
    };
  };
} => ({
  rabbitmq: {
    uri: process.env.RABBITMQ_URI || process.env.RABBITMQ_URL,
    queues: {
      userService:
        process.env.RABBITMQ_QUEUE_USER_SERVICE || 'user_service_queue',
      authService:
        process.env.RABBITMQ_QUEUE_AUTH_SERVICE || 'auth_service_queue',
      movieDataService:
        process.env.RABBITMQ_QUEUE_MOVIE_DATA_SERVICE || 'movie_data_queue',
      movieMatchingService:
        process.env.RABBITMQ_QUEUE_MOVIE_MATCHING_SERVICE ||
        'movie_matching_queue',
    },
  },
});
