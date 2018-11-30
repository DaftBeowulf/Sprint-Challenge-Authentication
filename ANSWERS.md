<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
   sessions persist data across requests, in authentication they can be used to persist credentials so there is no need to reenter them upon every client request to the server

2. What does bcrypt do to help us store passwords in a secure manner.
   bcrypt converts the password into a hash string which isn't accessible to outside sources without the exact same algorithm used to encrypt it

3. What does bcrypt do to slow down attackers?
   bcrypt slows down attackers by utilizing Key Derivation Functions to add a time parameter in with the hash process, which builds on itself for each specified iteration, making it exponentially harder for attackers decipher the hash with something like a rainbow table

4. What are the three parts of the JSON Web Token?
   header, payload, and signature
