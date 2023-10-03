import Classroom from '../../Instances/Classroom';
// =============================================== [ Libraries ]
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} from 'graphql'

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
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                classes: {
                    type: new GraphQLList(this.types.ClassroomType),
                    resolve: async (parent, args) => {
                        console.log(parent)
                        console.log("--")
                        return (await (this.data.database.collection('classrooms')).find({ students: parent.id }).toArray()) || null
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
                        const fetched = await (this.data.database.collection("users").find({ id: { $in: parent.teachers } })).toArray();
                        return fetched || [];
                    }
                },
                students: {
                    type: new GraphQLList(this.types.UserType),
                    resolve: async (parent, args) => {
                        const fetched = await (this.data.database.collection("users").find({ classes: parent.id })).toArray();
                        return fetched || [];
                    }
                },
                posts: {
                    type: new GraphQLList(this.types.PostType),
                    resolve: async (parent, args) => {
                        const fetched = await (this.data.database.collection("posts").find({ id: { $in: parent.posts } })).toArray();
                        return fetched || [];
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
        })
    }
    RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: this.types.UserType,
                args: { id: { type: GraphQLID } },
                resolve: async (parent, args) => {
                    return (await (this.data.database.collection("users")).findOne({ id: args.id })) || null;
                }
            },
            users: {
                type: new GraphQLList(this.types.UserType),
                resolve: async (parent, args) => {


                }
            },
            post: {
                type: this.types.PostType,
                args: { id: { type: GraphQLID } },
                resolve: async (parent: any, args: any) => {

                }
            },

        }
    });
}