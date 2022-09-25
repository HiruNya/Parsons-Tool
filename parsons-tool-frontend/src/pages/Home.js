import React from 'react';
import Login from '../components/Login.js';

function Home() {
  return (
    <div className="ml-2 flex flex-col items-center">
      <img className="mt-3 w-6/12 mx-auto" src="upp-logo.svg" alt="logo for site" />

      <p className="p-3 my-2 w-10/12 rounded-xl bg-blue-100 text-lg">
        Welcome to the tool we have created to aid in presenting a specific format of coding problems: Parsons Problems
        <br />
        <br />
        Parsons problems are a type of programming puzzle that requre the user to unscramble code blocks into the
        correct solution. This tool focuses on presenting <b> Faded parsons problems </b> which is when some of the code
        blocks are left partially blank and they requre the user to input the correct answer.
        <br />
        <br />
        As users are attempting to complete the problem, they are allowed to submit their current code to our server
        which will execute it against some preset test cases for the given problems, the result of which will be
        returned to provide feedback which they can use to fix up any mistakes.
        <br />
        <br />
        These problems are used in a study to see how students interact with the problem format, so please try your best
        to solve the problems <b>individually</b>. You do not need to submit a complete answer, you only need to give it
        your best effort and submit your attempt when you feel like you have finished.
        <br />
        <br />
        When you are ready, please login with your university email through the google popup that appears after
        selecting the button below.
        <br /> <br />
        <b>
          We recommend that you do not use incognito and allow popups if asked. Please note that this tool was mainly
          tested on Chrome so we strongly recommend trying this on Chrome if you encounter any issues when logging in.
        </b>
        <br /> <br />
        If you have any questions please forward them to: <br /> <br />
        <i>ffro805@aucklanduni.ac.nz</i> <br /> <br />
        with "faded parsons problem" in the subject line
      </p>
      <Login />
    </div>
  );
}

export default Home;
