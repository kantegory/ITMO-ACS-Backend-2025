import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        name: {type: 'string', example: 'Alice'},
                        email: {type: 'string', example: 'alice@example.com'},
                    },
                },
                Tag: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        name: {type: 'string', example: 'Dessert'},
                    },
                },

                Subscription: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        subscriber: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer', example: 1},
                                name: {type: 'string', example: 'John Doe'}
                            }
                        },
                        creator: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer', example: 2},
                                name: {type: 'string', example: 'Jane Smith'}
                            }
                        },
                        createdAt: {type: 'string', format: 'date-time', example: '2025-04-20T12:00:00Z'}
                    },
                },

                Recipe: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        title: {type: 'string', example: 'Delicious Cake'},
                        description: {type: 'string', example: 'A delicious cake recipe.'},
                        ingredients: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {type: 'string', example: 'Flour'},
                                    quantity: {type: 'string', example: '2 cups'}
                                }
                            }
                        },
                        content: {
                            type: 'array',
                            items: {
                                oneOf: [
                                    {
                                        type: 'object',
                                        properties: {
                                            type: {type: 'string', enum: ['text'], example: 'text'},
                                            content: {type: 'string', example: 'Mix the ingredients.'}
                                        }
                                    },
                                    {
                                        type: 'object',
                                        properties: {
                                            type: {type: 'string', enum: ['image'], example: 'image'},
                                            url: {type: 'string', example: 'http://example.com/image.jpg'},
                                            alt: {type: 'string', example: 'A delicious cake'}
                                        }
                                    }
                                ]
                            }
                        },
                        author: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer', example: 1},
                                name: {type: 'string', example: 'John Doe'}
                            }
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {type: 'integer', example: 1},
                                    name: {type: 'string', example: 'Dessert'}
                                }
                            }
                        },
                        likes: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {type: 'integer', example: 1}
                                }
                            }
                        },
                        comments: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {type: 'integer', example: 1}
                                }
                            }
                        },
                        createdAt: {type: 'string', format: 'date-time', example: '2025-04-20T12:00:00Z'},
                        updatedAt: {type: 'string', format: 'date-time', example: '2025-04-20T12:00:00Z'}
                    }
                },
                Like: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        user: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer', example: 1},
                                name: {type: 'string', example: 'John Doe'}
                            }
                        },
                        recipe: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer', example: 1},
                                title: {type: 'string', example: 'Delicious Cake'}
                            }
                        },
                        createdAt: {type: 'string', format: 'date-time', example: '2025-04-20T12:00:00Z'}
                    }
                },
                Comment: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        content: {type: 'string', example: 'Great recipe! I love this cake.'},
                        user: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer', example: 1},
                                name: {type: 'string', example: 'John Doe'}
                            }
                        },
                        recipe: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer', example: 1},
                                title: {type: 'string', example: 'Delicious Cake'}
                            }
                        },
                        createdAt: {type: 'string', format: 'date-time', example: '2025-04-20T12:00:00Z'}
                    }
                }

            },
        },

    },
    apis: ['./src/routes/**/*.ts'],
});
