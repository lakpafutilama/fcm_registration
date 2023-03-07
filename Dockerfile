FROM node:18

WORKDIR C:\Users\DELL\Desktop\external_fcm_registration

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
