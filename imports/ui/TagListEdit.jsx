import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment  } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import { makeStyles } from '@material-ui/core/styles';


// import { useGlobalContext } from './GlobalContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);


export const TagListEdit = () => {
    const classes = useStyles();

    // const { user } = useGlobalContext();
    //console.log('userfrom gtx', user);

    const user = useTracker(() => Meteor.user());

    // react hooks
    const [hideCompleted, setHideCompleted] = useState(false);

    // obj represents mongo query params 
    const hideCompletedFilter = { isChecked: { $ne: true } };

    // either return obj with user creds or empty obj
    const userFilter = user ? { userId: user._id } : {};

    // filters only the pending
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

    //use a single useTracker to get data from TasksCollection
    const { tasks, pendingTasksCount, isLoading } = useTracker(() => {

        // if no user logged in return empty array and 0 pending
        const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
        if (!Meteor.user()) {
        return noDataAvailable;
        }

        // sub to tasks
        const handler = Meteor.subscribe('tasks');

        // set loading if handler is not ready
        if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: true };
        }

        const tasks = TasksCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        {
            sort: { createdAt: -1 },
        }
        ).fetch();

    // returns the count of items not including completes, hideCompletedFilter holds query params for mongo
        const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
        return { tasks, pendingTasksCount };
    });

    
    // returns either the pending cound or an empty string
    const pendingTasksTitle = `${
        pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;

  return (<div>
    <div className="app">
            <div className="tag-header">
                  <h3>
                    Tags
                    {pendingTasksTitle}
                </h3>
            </div>


        <div className="taglist">
          {user ? (
            <Fragment>
              <TaskForm/>
              <div className="filter">
                {/* <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? 'Show All' : 'Hide Marked'}
                </button> */}
              </div>
              {/* && is shortcircuit Operator Short circuiting means that in JavaScript when we are evaluating an AND expression (&&), if the first operand is false, JavaScript will short-circuit and not even look at the second operand.*/}
              {isLoading && <div className="loading">loading...</div>}

                <div className={classes.root}>
                  {tasks.map(task => (
                    <Task
                      key={task._id}
                      task={task}
                      onCheckboxClick={toggleChecked}
                      onDeleteClick={deleteTask}
                    />
                  ))}
                </div>
              </Fragment>
              ) : (
                <LoginForm />
              )}
        </div>
    </div>
  </div>);
};