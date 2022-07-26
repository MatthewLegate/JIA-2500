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


<h2>Release Notes – v1.0.0</h2>

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
</ul>

<br><hr><br>

<h2>Install Guide</h2>
<p>This section will aid in installing and running the software.</p>

<h4>Pre-requisites:</h4>
<p>
4GB of RAM<br>
10 GB free storage space<br>
Internet Browser (Chrome, Firefox, Edge) <em>*Note: Internet Explorer is NOT compatible</em><br> 
</p>
<br>
<h4>Dependent libraries:</h4>
<p>Install latest LTS version of node.js and npm<br>
  <b>Step 1:</b> Navigate to <a href="https://nodejs.org/en/download/">https://nodejs.org/en/download/</a><br>
  <b>Step 2:</b> Select either the Windows Installer or the macOS Installer depending on user’s system.<br>
  <b>Step 3:</b> Run the downloaded installer package and click Next<br>
</p>
<img src"https://raw.githubusercontent.com/MatthewLegate/JIA-2500/main/readmeImages/node01.png">
