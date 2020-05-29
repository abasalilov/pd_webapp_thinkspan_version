# PD 2020

Web App Version of Parts Detect Mobile App w/ DIY Services

## Getting Started

git clone https://github.com/abasalilov/pd_webapp_thinkspan_version.git

### Installing

git: https://www.atlassian.com/git/tutorials/install-git

homebrew: https://docs.brew.sh/Installation

node: https://www.guru99.com/download-install-node-js.html

### Front-end Development mode:

1.) use yarn to install w/ node v10.16.3+, not npm.
2.) yarn
3.) npm run dev

### Front-end production mode:

1.) yarn
2.) npm run build
3.) ctrl + c (post build)
4.) yarn add pm2 -G
5.) pm2 start app.json

### API Development mode:

1.) use yarn to install w/ node v10.16.3+, not npm.
2.) Install MySQL & Postgres (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
2.) npm run dev

### API production mode:

1.) yarn
2.) yarn add pm2 -G
4.) manually create configuration file named “emailCreds” => vim emailCreds.js (enter the content below)
3.) pm2 start app.json
4.) adjust name serversettings for godaddy and digital ocean (or other host service)

Configuration file contents: 
“const emailCreds = {
username: "adayearlyadm@gmail.com",
password: "adayearly22!",
mailOptions: { subject: "Parts Detect Account Registration" }
};
module.exports = emailCreds;”

Digital Ocean Instance Start Up: https://www.digitalocean.com/docs/droplets/how-to/create/

Digital Ocean environment Setup:

Digital Ocean API database install:

- We use sequelize as top-layer DB organizer, with a base of MySQL. DB design has 2 schemas: User & Mortgage with connected by a foreign key of username.
- Reference link here, if needed: https://medium.com/sareno/setting-up-a-microsoft-sql-server-on-ubuntu-using-digitalocean-a939b45c2114

NGINX Web Server Setup:

- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
- Here is a copy of the current config:

server {
listen 80;
listen [::]:80;

        root /var/www/adayearly.com;
        index index.html index.htm index.nginx-debian.html;

        server_name adayearly.com www.adayearly.com;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }

}

Front-end Development mode:
1.) use yarn to install w/ node v10.16.3+, not npm.
2.) yarn
3.) npm run dev

Front-end production mode:
1.) yarn
2.) npm run build
3.) ctrl + c (post build)
4.) yarn add pm2 -G
5.) pm2 start app.json

API Development mode:
1.) use yarn to install w/ node v10.16.3+, not npm.
2.) Install MySQL & Postgres (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
2.) npm run dev

API production mode:
1.) yarn
2.) yarn add pm2 -G
4.) manually create configuration file named “emailCreds” => vim emailCreds.js (enter the content below)
3.) pm2 start app.json
4.) adjust name serversettings for godaddy and digital ocean (or other host service)

Configuration file contents: 
“const emailCreds = {
username: "adayearlyadm@gmail.com",
password: "adayearly22!",
mailOptions: { subject: "Parts Detect Account Registration" }
};
module.exports = emailCreds;”

Digital Ocean Instance Start Up: https://www.digitalocean.com/docs/droplets/how-to/create/

Digital Ocean environment Setup:

Digital Ocean API database install:

- We use sequelize as top-layer DB organizer, with a base of MySQL. DB design has 2 schemas: User & Mortgage with connected by a foreign key of username.
- Reference link here, if needed: https://medium.com/sareno/setting-up-a-microsoft-sql-server-on-ubuntu-using-digitalocean-a939b45c2114

NGINX Web Server Setup:

- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
- Here is a copy of the current config:

server {
listen 80;
listen [::]:80;

        root /var/www/adayearly.com;
        index index.html index.htm index.nginx-debian.html;

        server_name adayearly.com www.adayearly.com;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }

}
Front-end Development mode:
1.) use yarn to install w/ node v10.16.3+, not npm.
2.) yarn
3.) npm run dev

Front-end production mode:
1.) yarn
2.) npm run build
3.) ctrl + c (post build)
4.) yarn add pm2 -G
5.) pm2 start app.json

API Development mode:
1.) use yarn to install w/ node v10.16.3+, not npm.
2.) Install MySQL & Postgres (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
2.) npm run dev

API production mode:
1.) yarn
2.) yarn add pm2 -G
4.) manually create configuration file named “emailCreds” => vim emailCreds.js (enter the content below)
3.) pm2 start app.json
4.) adjust name serversettings for godaddy and digital ocean (or other host service)

Configuration file contents: 
“const emailCreds = {
username: "@gmail.com",
password: "!",
mailOptions: { subject: "Parts Detect Account Registration" }
};
module.exports = emailCreds;”

Digital Ocean Instance Start Up: https://www.digitalocean.com/docs/droplets/how-to/create/

Digital Ocean environment Setup:

- Install node v10+, git and mysql. Detailed instructions here: https://hackernoon.com/start-to-finish-deploying-a-react-app-on-digitalocean-bcfae9e6d01b

Digital Ocean API database install:

- We use sequelize as top-layer DB organizer, with a base of MySQL. DB design has 2 schemas: User & Mortgage with connected by a foreign key of username.
- Reference link here, if needed: https://medium.com/sareno/setting-up-a-microsoft-sql-server-on-ubuntu-using-digitalocean-a939b45c2114

NGINX Web Server Setup:

- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
- Here is a copy of the current config:

server {
listen 80;
listen [::]:80;

        root /var/www/adayearly.com;
        index index.html index.htm index.nginx-debian.html;

        server_name adayearly.com www.adayearly.com;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }

}
