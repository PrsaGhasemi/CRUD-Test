# CRUD-Test
my CRUD test with nodejs and express, built on docker
here you can create a user with different abilities: 
admin: can list all users and edit/delete their information and accounts, admin user can't be created while signing-up but an admin can change
role of another admin
operator: an operator can only change its own information
users sign up with their first name, last name, email and password (their information validatoin will be checked with Yup package and will be 
stored in data base, their password also will be hashed to protect their security)
to do every action you need to be signed-in (user validation is checked with JWT) 
after signing-up an email will be sent to user's email including a confirmation code to make sure that user entered its true mail (created with 
node mailer)
