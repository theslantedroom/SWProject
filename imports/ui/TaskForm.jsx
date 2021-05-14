import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
// import { TasksCollection } from '/imports/db/TasksCollection';

 
export const TaskForm = ({user}) => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    console.log('click add tag');
    // prevents a refresh of browser
    e.preventDefault();
    // console.log('click',text);
    // exit out if no text in form // for
    if (!text) return;
    Meteor.call('tasks.insert', text);

    // Old code for Insecure package
    // TasksCollection.insert({
    //   text: text.trim(),
    //   createdAt: new Date(),
    //   userId: user._id
    // });
    setText("");
  };
 
  return (<form className="task-form" >
      <input
        type="text"
        placeholder="Type to add new Tag"
        value = {text}
        onChange = {(e)=> setText(e.target.value)}
      />
 
      <button onClick={handleSubmit} type="submit">Add Tag</button>
    </form>
  );
};