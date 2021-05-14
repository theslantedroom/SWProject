import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import { MemberDb } from '/imports/db/MemberDb';
// Task Methods for meteor
import '/imports/api/memberDbMethods';
import '/imports/api/taskMethods';

//  make sure your server is registering publications
import '/imports/api/tasksPublications';
import '/imports/api/memberDbPublications';



// init user creds on startup
const SEED_USERNAME = '1';
const SEED_PASSWORD = '1';

// put a task into DB
const insertTask = (taskText, user) => 
TasksCollection.insert({ 
  text: taskText,
  userId: user._id, 
  createdAt: new Date(),
});

// put a task into DB
const addCity = (city, user) => 
MemberDb.insert({ 
  city: city,
  userId: user._id, 
  createdAt: new Date(),
});
 
Meteor.startup(() => {
  // Create a starter account if none matched init creds
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
  }
  

  // grab user creds from DB
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  // if DB is empty create some starter data
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Taggsk',
      'Sixth Task',
      'Seventh Task'
    ].forEach((taskText) => insertTask(taskText, user));
  }
});