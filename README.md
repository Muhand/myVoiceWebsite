# myVoiceWebsite
# Table of Content

+ [Description](#Description)
+ [Getting Started](#GettingStarted)
  * [Prerequisites](#Prerequisites)
  * [Installing](#Installing)
+ [Optional](#Optional)
  * [New Vagrant](#Newvagrant)
  * [Starting a new project from scratch](#Newproject)
+ [Running the tests](#RunningTheTests)
  * [Break down into end to end tests](#BreakDown)
  * [And coding style tests](#CodeStyle)
+ [Deployment](#Deployment)
+ [Built With](#BuiltWith)
+ [Contributing](#Contributing)
+ [Versioning](#Versioning)
+ [Authors](#Authors)
+ [License](#License)
+ [Acknowledgments](#Acknowledgments)

# <a name="Description"></a>myVoiceWebsite
This is the website for the app myVoice

# <a name="GettingStarted"></a>Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## <a name="Prerequisites"></a>Prerequisites
1. <a href="https://www.vagrantup.com/">Vagrant</a> 
2. <a href="https://www.virtualbox.org/wiki/Downloads">VirtualBox</a>
3. <a href="https://git-scm.com/downloads">Gitbash</a>
4. <a href="https://www.sublimetext.com/">Sublime</a> (or any other text editor)
5. <a href="https://www.mysql.com/products/workbench/">MySQL Workbench</a> (or any other mySql tool)

## <a name="Installing"></a>Installing
A step by step series of steps that will have you install the appropriate enviornment.

After installing Gitbash, Virtualbox and Vagrant from the [Prerequisites](#Prerequisites) section, follow this guide.

1. Open Git Bash and navigate to a place where you want to clone this project
  1. Make folder for The Project
  2. Clone the project
    ```
    git clone https://github.com/Muhand/myVoiceWebsite.git
    ```
  3. Change directory into the myVoiceWebsite
    ```
    cd myVoiceWebsite
    ```
2. Now we need to setup our vagrant machine
    ```
    cd www.myvoice.com
    ```

3. Run the vagrant machine and ssh into it
    ```
    Vagrant up && vagrant ssh
    ```

    Optional: If you want to create your own vagrant machine from scratch please follow [New Vagrant Machine from Scratch](#Newvagrant) in the [Optional](#Optional)section.

4. Update the machine
    ```
    sudo apt-get update
    ```

5. Install MySQL Server
    ```
    sudo apt-get install mysql-server -y
    ```
Wait until this screen come up and enter your root password, I will put '123456' without quotes then press 'OK' or hit Enter from keyboard and re-enter the password for confirmation. ![Alt text](https://s16.postimg.org/rqu0ujl39/mysql_0.png "Set Root Password")

6. After installation is done, lets edit /etc/mysql/my.cnf/ in order to allow connection from any server (DO THIS ONLY FOR DEVELOPMENT PURPOSES, FOR PRODUCTION YOU WILL HAVE TO EDIT EVEN FURTHER).
    I will edit it with nano editor but you can do it with whatever editor you like.
    ```
    sudo nano /etc/mysql/my.cnf
    ```
Then look for 'bind-address' and add '#' before it, now few lines before this look for 'skip-external-locking' and add '#' as well, this will comment these 2 lines which will will allow wildcard connections to the server.
    Your file should look like this at the end
    ![Alt text](https://s17.postimg.org/saq67aehr/mysql_1.png "Wildcard access to the server")

7. Exit out from your editor and save, If you are using nano editor then press the following keys from keyboard one line at the time.
    ```
    CTRL + X
    Y
    Enter
    ```

8. Now we have to create a user for our database, to do this we first have to do the following steps
    1. Login to mysql as root
        ```
        mysql -u root -p
        ```
    2. Type the root password (We already set it to '123456')
    3. Now create a user so our app use it, I will call it 'mv_dev' you can call it anything you want but then you will have to change it in the config.json file as well, I will give it '123456' as a password, again if you change it then you must change config.json.
        ```
        CREATE USER 'mv_dev'@'localhost' IDENTIFIED BY '123456';
        ```
    4. We need to give it all of the privileges
        ```
        GRANT ALL PRIVILEGES ON *.* TO 'mv_dev'@'localhost' WITH GRANT OPTION;
        ```
    5. Now we need to create this user to be accessable also from other hosts and not only localhost so we will repeat the above steps and just change 'localhost' to a wildcard '%'
        ```
        CREATE USER 'mv_dev'@'%' IDENTIFIED BY '123456';
        ```
    6. We need to give it all of the privileges
        ```
        GRANT ALL PRIVILEGES ON *.* TO 'mv_dev'@'%' WITH GRANT OPTION;
        ```
    7. Now we need to flush the privileges then simply just exit
        ```
        FLUSH PRIVILEGES;
        exit;
        ```
    8. Now restart MySQL server
        ```
        sudo service mysql restart
        ```
    
9. Now we need to make sure if our database setup was successful or not, for this we need to run MySQL Workbench from our host machine (windows) or any other program that allows us to connect to MySQL server.
    1. Now click on the plus sign, in order to add a new server.
    ![Alt text](https://s12.postimg.org/kwnhr4j99/mysql_2.png "Add new server to MySQL workbench")
    2. Add a connection name, anything you want.
    3. For hostname put '192.168.33.10' (without quotes) or if you have changed it in Vagrantfile then match it.
    4. Port leave it as is 3306
    5. For username put 'mv_dev' (without quotes) or any username you specified in config.json.
    6. Click on 'Store in Vault ...' for password and enter '123456' (without quotes) or any password you specified in config.json.
    7. Press on 'Test Connection', if everything went okay then you should see this
    ![Alt text](https://s11.postimg.org/fbwwqcg5v/mysql_3.png "Successful Connection")
    8. Now Press 'OK' and you should see your new server got added
    ![Alt text](https://s15.postimg.org/worzq9avv/mysql_4.png "New Server Added")
    9. Since we are working with the database then mind as well just add the appropriate database, to do that press on the 'Create a new schema in the connected server' button from the toolbar (THIS HAS TO BE DONE AFTER YOU HAVE CONNECTED TO THE ADDED SERVER)
    ![Alt text](https://s16.postimg.org/8qid9l451/mysql_5.png "Add new database")
    10. Enter a schema name and let it be 'mv_development' without quotes then press 'Apply' and finally press 'Finish'
    11. Now close out MySQL workbench and we are done with setting up our database server and schema.

10. Now back to vagrant we need to install Node.js to do this head to our vagrant/project folder
    ```
    cd /vagrant/project
    ```

11. To install vagrant we need to follow these steps
    1. Install build-essential and other liabraries
        ```
        sudo apt-get install build-essential libssl-dev curl -y
        ```
    2. Curl nvm
        ```
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
        ```
    3. Now we need to load the functions to the shell
        ```
        source ~/.profile
        ```
    4. Check that nvm is available, you should get back 'nvm'
        ```
        command -v nvm
        ```
    5. Install node.js version 6.5.0
        ```
        nvm install 6.5.0
        ```
    6. Verify that node.js is installed correctly
        ```
        nvm ls
        ```
    7. Check the node version and it should say 'v6.5.0'
        ```
        node -v
        ```
    
12. Before installing our dependencies we first need to install sequelize-cli
    ```
    npm install -g sequelize-cli
    ```

13. Now we need to install our dependencies
    ```
    npm install
    ```
    1. NOTE: if you are running windows that might give you some errors because there is a bug with symlinks so you might want to run the following command
        ```
        npm install --no-bin-links
        ```

14. Now we need to update our database tables, and migrate it with our models
    ```
    sequelize db:migrate
    ```

15. Now run the website
    ```
    npm start
    ```

16. Now test the website is working correctly by going to this address 192.168.33.10:8080 from your web browser and you should see the website running.

---
End with an example of getting some data out of the system or using it for a little demo

# <a name="Optional"></a>Optional
The sub-sections in this section are all optional.

## <a name="Newvagrant"></a>New Vagrant Machine from Scratch
This section assumes you have already went over the [Prerequisites](#Prerequisites) section.

1. Run Gitbash
2. Navigate to the folder where you want to create the vagrant machine
3. Run the following command
	```
	vagrant init ubuntu/trusty64
	```
4. Now we need to edit the Vagrantfile by openning it in a text editor, I recommend using Sublime
5. Uncomment line 26, so it's like this
	```
	config.vm.network "forwarded_port", guest: 80, host: 8080
	```
6. Now add mysql support by editing line 26, to be like this
	```
	config.vm.network "forwarded_port", guest: 80, host: 8080, mysql:3306
	```
7. Now we need to uncomment line 35 by removeing the '#' symbol from the beginning of the line. It should look like this
    ```
    config.vm.network "private_network", ip: "192.168.33.10"
    ```
8. (Optional) you can edit the IP address in line 35, this is the IP you will use to connect to the machine

## <a name="Newproject"></a>Starting a new project from scratch
This section assumes you have already installed a clean version of vagrant by following the [New Vagrant Machine from Scratch](#Newvagrant) section.

1. Now you need to follow [Installing](#Installing) section starting at step 6 (If you didn't start your machine yet) or 7 (if you have already started the machine and SSHed into it) up to step 9 (Finish step 9 and come back here)

2. Now we need to create our source folder (The folder where we will write our code), the nice thing about vagrant is that it can share files between it's machine and your host machine (your main machine); However everything that is shared is stored in /vagrant directory in the root. To navigate to it:
    ```
    cd /vagrant
    ```
3. After navigating to it, we need to create a project file by following this command
    ```
    mkdir src
    ```
4. Change 'src' to anything you want, now navigate to this project directory by typing
    ```
    cd src
    ```
5. Now we ned to install our Node.JS, to do this follow step 11 in [Installing](#Installing) setcion
    1. I installed nvm 6.5.0; This is the most stable at this time, but evenutally there will be more stable versions, you can checkout all versions by typing
    ```
    nvm ls-remote
    ```
    2. The install the one you want, if you have more than 1 Node.JS versions installed then you can switch between them by typing
    ```
    nvm use x.x.x
    ```
    let x.x.x be your version number.

6. Test node works by typing
    ```
    node
    ```
7. Finally now we can create our new web app by following this command
    ```
    npm init
    ```
    This command will create a ```package.json``` to mana our project dependencies and scripts.
    You will notice that terminal will prompt you with configurations for your package.json file, just follow the prompts, the first prompt asks about the APP name, then version (Hit enter to keep it at default), then description, then the entry point, for this I like to name it ```app.js``` and now just follow the prompts (you can edit this at any time.
8. Now we need to create our start script, so the server knows how to start.
    1. To do this go back to your host machine and open the project folder with Sublime or any other project managment tool
    2. open package.json to edit
        Go to ```"scripts": {``` line and below it add
        ```
        "start": "node app.js",
        ```
        Save it and go back to your Gitbash
        This is the script that will handle our server
9. Now we need to install EXPRESS, to do this type the following command
    ```
    npm install --save express
    ```
    This command installs express to my node_modules directory and the --save option adds it to my package.json file as a dependency of my application.

    NOTE: if you are running windows that might give you some errors because there is a bug with symlinks so you might want to run the following command. As of 7/13/2017 this bug still exists
    ```
    npm install --save express --no-bin-links
    ```
10. Now we are ready to create our app, go back to Sublime and createa  new file in the root directory and call it "app.js" This is going to be the main file that will handle all of the routing in our app
    After creating the file, add the following code
    ```
    const express = require('express');     //Import our express framework
    const app = express();                  //Initialize it

    //Simple get function, it will return 'Hello world' to the webpage
    app.get('/', function(req, res){
        res.send('hello world');
    });

    //This is the port the app will work on, this must match what we have in Vagrant file
    app.listen(8000);

    ```
    Save everything

11. Now back to gitbash and run our server by typing
    ```
    npm start
    ```
12. Now the final step is to go to a webbrowser and navigate to 192.168.33.10:8000 (Make sure the ip and port matches what you have in the vagrant file)
    
13. Congratulations you have just created your first simple app

14. Optional but highly recommended
    Now if you go back to your app.js and make any changes they wont take effect immeditly, in order to see the changes you would have to go back to gitbash and press ```CTRL+C``` to terminate and then ```npm start``` to start the server again, this can be really annoying if the project gets larger; to solve this issue we will install nodemon

    1. To install nodemon type the following
    ```
    npm install --save nodemon
    ```
    Again if you face an error then type

    ```
    npm install --save nodemon --no-bin-links
    ```

    2. Now we need to update our package.json so it reflects our changes
    go to the "start" script and change it to
    ```
    "start": "node_modules/nodemon/bin/nodemon.js -L app.js",
    ```

    3. Finally start your server by typing
    ```
    npm start
    ```
    Now go to a web browser and type 192.168.33.10:8000 and you should be prompted with "hello world" now go back to your app.js and change the message to anything you want and go back to the web browser and refresh the page and you will see it taking effect immeditly.

# <a name="RunningTheTests"></a>Running the tests

Explain how to run the automated tests for this system

## <a name="BreakDown"></a>Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

## <a name="CodeStyle"></a>And coding style tests

Explain what these tests test and why

```
Give an example
```

# <a name="Deployment"></a>Deployment

Add additional notes about how to deploy this on a live system

# <a name="BuiltWith"></a>Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

# <a name="Contributing"></a>Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

# <a name="Versioning"></a>Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

# <a name="Authors"></a>Authors

* **Muhand Jumah** - *Initial work* - [Github](https://github.com/Muhand) [Personal Website](http://www.muhandjumah.com/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

# <a name="License"></a>License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

# <a name="Acknowledgments"></a>Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

___

The following is a brief overview of the contents of this repository.


