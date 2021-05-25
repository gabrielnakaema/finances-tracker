<h1>
  Finances Tracker API
</h1>

<p>This node.js API uses TypeScript, Express and MongoDB as main dependencies.</p>
<p>It uses docker as a way to containerize mongoDB</p>

<h3>How to run ? </h3>

<ol>
<li>Install node dependencies by running npm i, or yarn</li>
<li>Copy .env.example template to a new file called .env</li>
  <ul>
    <li>MONGO_INITDB_ROOT_USERNAME is the root mongoDB username</li>
    <li>MONGO_INITDB_ROOT_PASSWORD is the root mongoDB password</li>
    <li>DB_PERSIST_DIRECTORY should be filled as a directory for persisting the database data through container deactivation</li>
    <li>SECRET is the secret key used for the encoding and decoding of Json Web Token library's tokens used in the API's auth system.</li>
  </ul>  
<li>Run command "make up" on terminal to initialize docker container</li>
<li>Run "yarn dev" or "npm run dev" to run API in development mode</li>

</ol>
