import { Task } from '../../entity/Task';
import { getAuthenticatedUser } from '../../helpers/auth';
import { Resolver, ResolverMap } from '../../types/graphqlUtils';

const createTask: Resolver = async (_, {title, description, status}, context) => {
    const user = getAuthenticatedUser(context);
    
    const task = new Task();

    task.description = description;
    task.status = status;
    task.title = title;
    task.user = user;

    await task.save();

    return task;
}

const updateStatus: Resolver = async (_, {taskId, status}, context) => {
    getAuthenticatedUser(context);

    const task = await Task.findOne({id: taskId});

    if(!task){
        throw new Error('Task not found');
    }

    task.status = status;

    await task.save();

    return task;
}

const tasks: Resolver = async (_, { }, context) => {
    const user = getAuthenticatedUser(context);
    const tasks = await Task.find({where: { userId: user.id}});

    return tasks;
}

const resolvers: ResolverMap = {
    Query: {
        tasks
    },
    Mutation: {
        createTask,
        updateStatus
    },
}

export default resolvers;