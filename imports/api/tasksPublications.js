import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';


// Meteor.publish: allows the data to be published from the server to the client;
// Meteor.subscribe: allows the client code to ask for data to the client.


// As you are using this inside this function you should not use arrow function (=>) as the arrow function does not provide a context for this, you need to use the function in the traditional way, using the function keywor
Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});