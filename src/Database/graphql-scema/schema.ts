// =============================================== [ Libraries ]
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} from 'graphql'
import Classroom from '../../Instances/Classroom';
import User from '../../Instances/User'
import Post from '../../Instances/Post';

// ================================================ [ SchemaBuilder ]
export default class SchemaBuilder {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    public schema = () => new GraphQLSchema({ query: this.RootQuery });
    private types: any = {
        UserType: new GraphQLObjectType({
            name: 'User',
            fields: () => ({
                id: { type: GraphQLID },
                username: { type: GraphQLString },
                credentials: {
                    type: this.types.CredentialsType,
                    resolve: async (parent, args) => {
                        return parent.credentials
                    }
                },
                classes: {
                    type: new GraphQLList(this.types.ClassroomType),
                    resolve: async (parent, args) => {
                        return (await Classroom.schema().find({ students: parent.id })) || null
                    },
                }
            })
        }),
        ClassroomType: new GraphQLObjectType({
            name: 'Classroom',
            fields: () => ({
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                teachers: {
                    type: new GraphQLList(this.types.UserType),
                    resolve: async (parent, args) => {
                        return (await User.schema().find({ id: { $in: parent.teachers } })) || [];
                    }
                },
                students: {
                    type: new GraphQLList(this.types.UserType),
                    resolve: async (parent, args) => {
                        return (await User.schema().find({ id: { $in: parent.students } })) || [];
                    }
                },
                posts: {
                    type: new GraphQLList(this.types.PostType),
                    resolve: async (parent, args) => {
                        return (await Post.schema().find({ id: { $in: parent.posts } })) || [];
                    }
                }
            })
        }),
        PostType: new GraphQLObjectType({
            name: 'Post',
            fields: () => ({
                id: { type: GraphQLID },
                text: { type: GraphQLString },
                comments: {
                    type: new GraphQLList(this.types.CommentType),
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
        CommentType: new GraphQLObjectType({
            name: 'Comment',
            fields: () => ({
                id: { type: GraphQLID },
                text: { type: GraphQLString },
                user: { type: this.types.UserType },
            })
        }),
        CredentialsType: new GraphQLObjectType({
            name: "Credentials",
            fields: () => ({
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            })
        })
    }
    RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: this.types.UserType,
                args: { id: { type: GraphQLID } },
                resolve: async (parent, args) => {
                    return (await User.schema().findOne({ id: args.id })) || null;
                }
            },
            users: {
                type: new GraphQLList(this.types.UserType),
                resolve: async (parent, args) => {
                    return (await User.schema().find({})) || [];
                }
            },
            classroom: {
                type: this.types.ClassroomType,
                args: { id: { type: GraphQLID } },
                resolve: async (parent, args) => {
                    return (await Classroom.schema().findOne({ id: args.id })) || null;
                }
            },
            classrooms: {
                type: new GraphQLList(this.types.ClassroomType),
                resolve: async (parent, args) => {
                    return (await Classroom.schema().find({})) || [];
                }
            },
            postById: {
                type: this.types.PostType,
                args: { id: { type: GraphQLID } },
                resolve: async (parent: any, args: any) => {
                    return (await Post.schema().findOne({ id: args.id })) || null;
                }
            },
            postByClassId: {
                type: this.types.PostType,
                args: { id: { type: GraphQLID } },
                resolve: async (parent: any, args: any) => {
                    return (await Post.schema().findOne({ class: args.id })) || null;
                }
            },

        }
    });
}