export const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
        "description": "An API to help in my projects at Cotemig",
        "version": "1.0.0",
        "title": "Cotemig Projects API"
    },
    "host": "localhost:3000",
    "basePath": "/api",
    "tags": [
        {
            "name": "grades",
            "description": "Grade management"
        }
    ],
    "paths": {
        "/notas": {
            "get": {
                "tags": [
                    "grades"
                ],
                "description": "Get list of grades depending on the method choose.",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "query",
                        "name": "method",
                        "description": "Method that it`ll be used to return the grades",
                        "required": true,
                        "type": "string",
                        "enum": ["getAll", "getById", "getFinal", "getAvarege", "getTopThree"]
                    },
                    {
                        "in": "query",
                        "name": "id",
                        "description": "Id of Grade, required in method (getById)",
                        "required": false,
                        "type": "integer",
                        "example": 2
                    },
                    {
                        "in": "query",
                        "name": "student",
                        "description": "name of student, Only Required in method getFinal and getAvarege",
                        "required": false,
                        "type": "string",
                        "example": "Loiane Groner"
                    },
                    {
                        "in": "query",
                        "name": "subject",
                        "description": "name of subject, Only Required in method getFinal, getAvarege and getTopThree",
                        "required": false,
                        "type": "string",
                        "example": "03 - React"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/grades"
                            }
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            },
            "post": {
                "tags": [
                    "grades"
                ],
                "summary": "Create a new grade",
                "description": "Create a new grade with the received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/grade"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Grade Created",
                        "schema": {
                            "$ref": "#/definitions/gradeInsert"
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            },
            "delete": {
                "tags": [
                    "grades"
                ],
                "summary": "Delete grade",
                "description": "Delete by ID",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "ID of grade",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "example": 58
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Nota excluida com sucesso!"
                    },
                    "500": {
                        "description": "Error internal"
                    }
                }
            },
            "put": {
                "tags": [
                    "grades"
                ],
                "summary": "Update grade",
                "description": "Update grade by ID and received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "ID of grade",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "example": 58
                                },
                                "newGrade": {
                                    "$ref": "#/definitions/grade"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Grade updated",
                        "schema": {
                            "$ref": "#/definitions/gradeInsert"
                        }
                    },
                    "500": {
                        "description": "Error internal"
                    }
                }
            }
        }
    },
    "definitions": {
        "gradeInsert": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "integer",
                                "example": 1
                            },
                            "student": {
                                "type": "string"
                            },
                            "subject": {
                                "type": "string"
                            },
                            "type": {
                                "type": "string"
                            },
                            "value": {
                                "type": "integer",
                                "example": 15
                            },
                            "timestamp": {
                                "type": "date",
                                "example": "2020-05-19T18:21:24.981Z"
                            }
                        },
                        "example":
                            [
                                {
                                    "id": 1,
                                    "student": "Pedro",
                                    "subject": "React",
                                    "type": "Trabalho Prático",
                                    "value": 15,
                                    "timestamp": "2020-05-19T18:21:24.981Z"
                                }
                            ]
                    }
                }
            }
        },
        "grade": {
            "type": "object",
            "properties": {
                "student": {
                    "type": "string",
                    "example": "Pedro"
                },
                "subject": {
                    "type": "string",
                    "example": "React"
                },
                "type": {
                    "type": "string",
                    "example": "Projeto"
                },
                "value": {
                    "type": "integer",
                    "example": 10
                }
            }
        },
        "grades": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "integer",
                                "example": 1
                            },
                            "student": {
                                "type": "string"
                            },
                            "subject": {
                                "type": "string"
                            },
                            "type": {
                                "type": "string"
                            },
                            "value": {
                                "type": "integer",
                                "example": 15
                            },
                            "timestamp": {
                                "type": "date",
                                "example": "2020-05-19T18:21:24.981Z"
                            }
                        },
                        "example":
                            [
                                {
                                    "id": 1,
                                    "student": "Pedro",
                                    "subject": "React",
                                    "type": "Trabalho Prático",
                                    "value": 15,
                                    "timestamp": "2020-05-19T18:21:24.981Z"
                                },
                                {
                                    "id": 2,
                                    "student": "Juca",
                                    "subject": "Node",
                                    "type": "Projeto",
                                    "value": 10,
                                    "timestamp": "2020-05-19T18:21:24.981Z"
                                }
                            ]
                    }
                }
            }
        }
    }
}