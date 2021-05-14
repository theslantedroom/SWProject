import { check } from 'meteor/check';
import { MemberDb } from '../db/MemberDb';


Meteor.methods({

    
  'memberDb.setLocation'(location, user) {
    check(location, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const locationexists = MemberDb.find({'userId' : user._id}).fetch();
    if (locationexists.length === 0){
        MemberDb.insert({
        location,
        createdAt: new Date,
        userId: this.userId,
        })        
    } else {
        MemberDb.update({'userId' : user._id},{$set:{location : location }});
    }
  },
  'memberDb.setCompany'(company, user) {
    check(company, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const companyexists = MemberDb.find({'userId' : user._id}).fetch();
    if (companyexists.length === 0){
        MemberDb.insert({
        company,
        createdAt: new Date,
        userId: this.userId,
        })        
    } else {
        MemberDb.update({'userId' : user._id},{$set:{company : company }});
    }
  },
  'memberDb.setTitle'(title, user) {
    check(title, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const titleexists = MemberDb.find({'userId' : user._id}).fetch();
    if (titleexists.length === 0){
        MemberDb.insert({
        title,
        createdAt: new Date,
        userId: this.userId,
        })        
    } else {
        MemberDb.update({'userId' : user._id},{$set:{title : title }});
    }
  },
  'memberDb.setWebsite'(website, user) {
    check(website, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const websiteexists = MemberDb.find({'userId' : user._id}).fetch();
    if (websiteexists.length === 0){
        MemberDb.insert({
        website,
        createdAt: new Date,
        userId: this.userId,
        })        
    } else {
        MemberDb.update({'userId' : user._id},{$set:{website : website }});
    }
  },
 
});