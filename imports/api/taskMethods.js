import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
 
Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    TasksCollection.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
    })
  },
 
  'tasks.remove'(taskId) {
    check(taskId, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Only the owner of a task should be able to change certain things. You should change your methods to check if the user that is authenticated is the same user that created the tasks.
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId })
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }
 
    TasksCollection.remove(taskId);
  },
 
  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Only the owner of a task should be able to change certain things. You should change your methods to check if the user that is authenticated is the same user that created the tasks.
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }
 
    TasksCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  }
});