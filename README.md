<head>
  <base href="/JIA-2500/">
</head>

<h1 align="center">
  <img src="https://s3.amazonaws.com/rebelbase-production-s3/user_uploads/projects/%7Bproject_id%7D/project-profile-logo-156edee0-83a1-3380-92ec-8dd9b00ef3d6.png?v=63708760069" alt="Getinline, Inc." width="200">
  <br>
  Getinline
</h1>
<h4 align="center">Hate waiting in line? We do too!</h4>
<p><font size="3">
GetInLine is an application that has the primary purpose of creating a virtual queue system that incorporates artificial intelligence and geolocation features to allow users to increase their efficiency regarding queue times. Users will be able to queue into events both from the application and from a QR code. Administrators will possess the ability to create events and lines for other users to queue into.  </p>

<table align="center">
<thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>William Kang</td>
    <td>Wkang44@gatech.edu</td>
  </tr>
  <tr>
    <td>Pratik Deolasi</td>
    <td>Pdeolasi3@gatehc.edu</td>
  </tr>
  <tr>
    <td>Andrew Lukman</td>
    <td>alukman3@gatech.edu</td>
  </tr>
  <tr>
    <td>Nicolas Zacharis</td>
    <td>Nzacharis@gatech.edu</td>
  </tr>
  <tr>
    <td>Matthew LeGate</td>
    <td>legate@gatech.edu</td>
  </tr>
  <tr>
    <td>Joshua Lee</td>
    <td>jlee3508@gatech.edu</td>
  </tr>
</tbody>
</table>


<div align="center"><a name="menu"></a>
  <h4>
    <a href="https://github.com/MatthewLegate/JIA-2500#release-notes--v100">
      Release Notes
    </a>
    <span> | </span>
    <a href="https://github.com/MatthewLegate/JIA-2500#install-guide">
      Install Guide
    </a>
    <span> | </span>
    <a href="https://github.com/MatthewLegate/JIA-2500#download-instructions">
      Download Instructions
    </a>
    <span> | </span>
    <a href="https://github.com/MatthewLegate/JIA-2500#run-instructions">
      Run Instructions
    </a>
    <span> | </span>
    <a href="https://github.com/MatthewLegate/JIA-2500#troubleshooting">
      Troubleshooting
    </a>
  </h4>
</div>


<h1>Release Notes – v1.0.0</h1>

<h3>NEW FEATURES</h3>
<ul>
  <li>Added account registration for admin users</li>
  <ul>
    <li>Registration through email and password</li>
    <li>Registration through Google</li>
  </ul>
  <li>Added the ability to create, view, and delete events as an admin</li>
  <li>Added the ability to add, view, and remove users to an event’s queue as an admin</li>
  <li>Added the ability to generate a QR code for each event as an admin</li>
  <li>Added capability to determine a user’s location</li>
  <li>Added user landing page where</li>
  <ul>
    <li>users can browse events</li>
    <li>users can see distance in miles to each event (requires user location first)</li>
  </ul>
  <li>Added integration with Twilio to send an SMS to users after they get in line</li>
  <li>Added the ability to leave an event’s queue as a user</li>
</ul> 
<br>
<h3>KNOWN BUGS</h3>
<ul>
  <li>Google Firebase occasionally takes a while to load which can cause authentication to fail or certain data to not load when refreshed</li>
  <li>Login does not always work</li>
  <li>Users can add themselves to an event's queue again by just logging out, logging back in, and getting in line again</li>
  <li>Estimated waiting time does not populate with a time</li>
</ul>

<br><hr><br>

<h1>Install Guide</h1>
<p>This section will aid in installing and running the software.</p>

<h2>Pre-requisites:</h2>
<p>
4GB of RAM<br>
10 GB free storage space<br>
Internet Browser (Chrome, Firefox, Edge) <em>*Note: Internet Explorer is NOT compatible</em><br> 
</p>
<br>
<h2>Dependent libraries:</h2>
<p>Install latest LTS version of node.js and npm<br>
  <b>Step 1:</b> Navigate to <a href="https://nodejs.org/en/download/">https://nodejs.org/en/download/</a><br>
  <b>Step 2:</b> Select either the Windows Installer or the macOS Installer depending on user’s system.<br>
  <b>Step 3:</b> Run the downloaded installer package and click Next<br>
  <img src="/readmeImages/node01.png" width="300"> <br>
  <b>Step 4:</b> Accept the license terms and click Next <br>
  <img src="/readmeImages/node02.png" width="300"> <br>
  <b>Step 5:</b> Click Next  <br>
  <img src="/readmeImages/node03.png" width="300"> <br>
  <b>Step 6:</b> Click Next  <br>
  <img src="/readmeImages/node04.png" width="300"> <br>
  <b>Step 7:</b> Click Install  <br>
  <img src="/readmeImages/node05.png" width="300"> <br>
  <b>Step 8:</b> Click Finish  <br>
  <img src="/readmeImages/node06.png" width="300"> <br>
  <b>Step 9:</b> <em>(Optional but recommended)</em> Open cmd or terminal if on Windows or Mac, respectively. Run the following statement in cmd/terminal  <br>
</p>

```
node -v
```

There should be an output with some v16.x.x 

Run the following statement in cmd/terminal 

```
node -v
```

There should be an output with some v8.x.x 

<br>

<h2>Download instructions:</h2>  
<p>
  <b>Step 1:</b> Navigate to <a href="https://github.com/MatthewLegate/JIA-2500">https://github.com/MatthewLegate/JIA-2500</a><br>
  <b>Step 2:</b> Click on the green Code button to reveal the clone link<br>
  <img src="/readmeImages/download01.png" width="600"> <br>
  <b>Step 3:</b> Copy the github link<br>
  <b>Step 4:</b> Open up cmd or terminal and navigate to a directory you would like to use to house the project files using this command <br>
</p>
  
```
cd PATH-TO-LOCATION
```

<p><b>Step 5:</b> Run the following command</p>

```
git clone COPIED-GITHUB-LINK
```

<p><b>Step 6:</b> Change directory to the project’s root directory JIA-2500/</p>

```
cd JIA-2500/
```

<p><b>Step 7:</b> Run the following command</p>

```
npm install
```

<p><b>Step 6:</b> Change directory to the get-in-line/ directory</p>

```
cd get-in-line/
```

<p><b>Step 7:</b> Run the following command</p>

```
npm install
```



<h2>Run Instructions</h2>
<p><b>Step 1:</b> Open up cmd or terminal</p>

<p><b>Step 2:</b> Change directory to the JIA-2500/get-in-line/ directory</p>

```
cd /JIA-2500/get-in-line/
```

<p><b>Step 3:</b> Run the following command</p>

```
npm start
```

A successful output will be: <br>
<img src="/readmeImages/npmStart.png" width="600"> <br>

<p><b>Step 4:</b> Open up a <b>NEW</b> cmd or terminal</p>
<p><b>Step 5:</b> Change directory to the JIA-2500/get-in-line/server/ directory</p>

```
cd /JIA-2500/get-in-line/server
```

<p><b>Step 6:</b> Run the following command</p>

```
node index.js
```

A successful output will be:

```
Running on Port 4000
```



<h2>Troubleshooting</h2>
<p><b>Error:</b></p>

```node
npm: command not found
```

<p><b>Solution:</b> Verify that node.js and npm have been installed correctly. Follow Step 9 in the <a href="https://github.com/MatthewLegate/JIA-2500#dependent-libraries"> Dependent Libraries </a> section. If output does not show version number, then uninstall node.js and npm and re-install.</p>

<hr>

<p><b>Error:</b></p>

```node
Error: Cannot find module 'NAME-OF-MODULE'
```

<p><b>Solution:</b> Run </p>

```
npm install
```

inside the JIA-2500/ and get-in-line/ directories.

<hr>

<p><b>Error:</b></p>

```node
npm ERR! Missing script: "start"
```

<p><b>Solution:</b> npm start can only be run inside the get-in-line/ directory. Verify that you are in the correct directory</p>

<hr>

<p><b>Error: 'Distance from you:' on the /user page is stuck on 'loading...'</b></p>
<p><b>Solution:</b> User location must be acquired in order to calculate the distance to event. Click on 'Display My Coordinates' button and click 'Allow' when the browser asks for permission to share location.</p>
