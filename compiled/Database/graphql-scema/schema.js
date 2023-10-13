"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Classroom_1 = __importDefault(require("../../Instances/Classroom"));
const User_1 = __importDefault(require("../../Instances/User"));
const Post_1 = __importDefault(require("../../Instances/Post"));
class SchemaBuilder {
    data;
    constructor(data) {
        this.data = data;
    }
    schema = () => new graphql_1.GraphQLSchema({ query: this.RootQuery });
    types = {
        UserType: new graphql_1.GraphQLObjectType({
            name: 'User',
            fields: () => ({
                id: { type: graphql_1.GraphQLID },
                username: { type: graphql_1.GraphQLString },
                credentials: {
                    type: this.types.CredentialsType,
                    resolve: async (parent, args) => {
                        return parent.credentials;
                    }
                },
                classes: {
                    type: new graphql_1.GraphQLList(this.types.ClassroomType),
                    resolve: async (parent, args) => {
                        return (await Classroom_1.default.schema().find({ $or: [{ students: parent.id }, { teachers: parent.id }] })) || null;
                    },
                }
            })
        }),
        ClassroomType: new graphql_1.GraphQLObjectType({
            name: 'Classroom',
            fields: () => ({
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                teachers: {
                    type: new graphql_1.GraphQLList(this.types.UserType),
                    resolve: async (parent, args) => {
                        return (await User_1.default.schema().find({ id: { $in: parent.teachers } })) || [];
                    }
                },
                students: {
                    type: new graphql_1.GraphQLList(this.types.UserType),
                    resolve: async (parent, args) => {
                        return (await User_1.default.schema().find({ id: { $in: parent.students } })) || [];
                    }
                },
                posts: {
                    type: new graphql_1.GraphQLList(this.types.PostType),
                    resolve: async (parent, args) => {
                        return (await Post_1.default.schema().find({ id: { $in: parent.posts } })) || [];
                    }
                }
            })
        }),
        PostType: new graphql_1.GraphQLObjectType({
            name: 'Post',
            fields: () => ({
                id: { type: graphql_1.GraphQLID },
                text: { type: graphql_1.GraphQLString },
                comments: {
                    type: new graphql_1.GraphQLList(this.types.CommentType),
                    resolve: async (parent, args) => {
                    }
                },
                user: {
                    type: this.types.UserType,
                    resolve: async (parent, args) => {
                        return (await (this.data.database.collection("users")).findOne({ posts: parent.id })) || null;
                    }
                }
            })
        }),
        CommentType: new graphql_1.GraphQLObjectType({
            name: 'Comment',
            fields: () => ({
                id: { type: graphql_1.GraphQLID },
                text: { type: graphql_1.GraphQLString },
                user: { type: this.types.UserType },
            })
        }),
        CredentialsType: new graphql_1.GraphQLObjectType({
            name: "Credentials",
            fields: () => ({
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            })
        })
    };
    RootQuery = new graphql_1.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: this.types.UserType,
                args: { id: { type: graphql_1.GraphQLID } },
                resolve: async (parent, args) => {
                    return (await User_1.default.schema().findOne({ id: args.id })) || null;
                }
            },
            users: {
                type: new graphql_1.GraphQLList(this.types.UserType),
                resolve: async (parent, args) => {
                    return (await User_1.default.schema().find({})) || [];
                }
            },
            classroom: {
                type: this.types.ClassroomType,
                args: { id: { type: graphql_1.GraphQLID } },
                resolve: async (parent, args) => {
                    return (await Classroom_1.default.schema().findOne({ id: args.id })) || null;
                }
            },
            classrooms: {
                type: new graphql_1.GraphQLList(this.types.ClassroomType),
                resolve: async (parent, args) => {
                    return (await Classroom_1.default.schema().find({})) || [];
                }
            },
            postById: {
                type: this.types.PostType,
                args: { id: { type: graphql_1.GraphQLID } },
                resolve: async (parent, args) => {
                    return (await Post_1.default.schema().findOne({ id: args.id })) || null;
                }
            },
            postByClassId: {
                type: this.types.PostType,
                args: { id: { type: graphql_1.GraphQLID } },
                resolve: async (parent, args) => {
                    return (await Post_1.default.schema().findOne({ class: args.id })) || null;
                }
            },
        }
    });
}
exports.default = SchemaBuilder;
