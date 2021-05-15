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
const SEED_USERNAME = '1@1.com';
const SEED_PASSWORD = '1';

// put a task into DB
const insertTask = (taskText, user) => 
TasksCollection.insert({ 
  text: taskText,
  userId: user._id, 
  createdAt: new Date(),
});


 
Meteor.startup(() => {
  // Create a starter account if none matched init creds
  if (!Accounts.findUserByEmail(SEED_USERNAME)) {
        Accounts.createUser({
            email: SEED_USERNAME,
            password: SEED_PASSWORD,
            profile: {
                firstName: 'firstName',
                lastName: 'lastName',
                displayName: '1displayName',
                joinedDate: new Date(),
            }
        });
  }
  


  // grab user creds from DB
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  // if DB is empty create some starter data
  if (TasksCollection.find().count() === 0) {
    [
      'First tag',
      'Second tag'
    ].forEach((taskText) => insertTask(taskText, user));
  }
});