# Innminds Tutors

## What is Innminds ?

Innminds is a cutting-edge tutoring platform designed to revolutionize the way students learn and excel in their academic pursuits. With a user-friendly interface and powerful features, our application connects students with experienced tutors, providing personalized learning experiences tailored to their individual needs.

## Why Choose Innminds?

Quality Education: We prioritize quality instruction and academic excellence, ensuring that students receive the highest standard of tutoring from verified tutors.
Convenience: With anytime, anywhere access, students can learn from the comfort of their own homes, eliminating the hassle of commuting to tutoring centers.
Affordability: We believe that every student deserves access to quality education. Our transparent pricing model offers competitive rates and flexible payment options.
Community Support: Join a vibrant community of learners and educators, where students can collaborate with peers, share study tips, and access additional resources to enhance their learning journey.


# Documentation

## Software Requirement Specification

### Overview

Innminds is a cutting-edge tutoring platform designed to revolutionize the way students learn and excel in their academic pursuits. With a user-friendly interface and powerful features, our application connects students with experienced tutors, providing personalized learning experiences tailored to their individual needs.

### components and functional requirement

**1. Authentication and authorisation management**
  * user can register through admin
  * user can log into innminds webapp
  * user can access their unique profile

**2. User/Profile management**
 * user can access their personal preferences
 * user can update their personal information
 * user can deactivate their profile
 
**3. Grading subsystem**
 * user able to see their marks
 * tutor able to upload grades
 * student can get a progress result

**4. communication/chat subsystem**

student
 * user able to send and receive from community of the subject they enrolled in
 * user can directly message the tutor involved with the subject
 * submit feedback on the lessons

tutor 
 * send and receive message in community of their subject
 * send and receive message to/from student
 * announce of any new content

**5. lesson management subsystem**

student

 * student able to attend classes
 * student able to download classes pdf notes
 * student able to download past papers and extra resources
 * submit homework

tutor 

 * tutor can upload youtube video
 * tutor can upload pdf of the lesson
 * tutor can review homework
 * tutor can upload homework

**6. Request subsystem**

 * student can log a request for any personal information they would like to change
 * tutor can log a request for any details to be added or edited

**7. Subject Management**

 * tutor able to add and edit subject
 * tutor to delete subject

### use case diagrams

### architecture diagram

# Design

## [Wireframes](https://www.figma.com/file/ATCmuf9e3eFScItIYkp2Zd/innminds-tutors?type=design&node-id=0%3A1&mode=dev&t=KOQnxVDxgaIX0gUm-1)

## [Domain Model](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=domainModel.drawio#R7Z1bc%2BOoEoB%2FjR83pbvsx9xmN1XJmVSy10diEVs7kvBBeBzPrz8gga0L%2BDIRwqeKqakZg5Elwaemu2k1E%2F82%2F%2FgVg9XyCSUwm3hO8jHx7yae50VOTP9jNdu6xvXDqK5Z4DThdfuK1%2FQH5JUOr12nCSxbDQlCGUlX7co5Kgo4J606gDHatJu9o6x91hVYwF7F6xxk%2Fdq%2F0oQs69pp6Ozrf4PpYinO7Dr8mxyIxryiXIIEbRpV%2Fv3Ev8UIkfpT%2FnELM9Z7ol%2Fq474ovt1dGIYFOeWAEl%2B%2F3IDnh3XiLuJy%2FdeP376sfuG%2F8h1ka37DJVkn7BfrayZb0RHlJs0zUNDSzTsqyCv%2FxqHl%2BTLNkkewRWt2ISUB82%2BidLNEOP1B24OMfuXSCvo1JnycvYj9WppltyhDmFYUqDrB%2FqBX9mP8NBiW9LBnccNup%2BoJfLQaPoKSiAtEWQZWZfpWXTI7MAd4kRY3iBCU80abZUrg6wrMWZsNxZldCMnFdfOOgpjAD%2BUIuLtxpU8ERDkkeEub8APigKMgHoZoVpc3e7JcQdaySZXPKwGnebH77f2A0w98zM8Y%2F7g3%2FhPvhp3orRq%2B64oBnBaLHg%2B0G0g1nBh9g53xkwwpyNJFQYsZfGeHsX5M6VN2zasJYt1d0t6n53qs2twF%2B5oX3hesCtFj37PqSVqmCWWVjTgigIC3HZErlBak6qvwhv6lvXfrXIWTkF74LS27%2BzL9y5pjcosKei8grYYSUnY2kPEzCBbqR6%2FPylaIztPQEO0GJ0OIrR4a5frtXyppy5oO1sHs3ztLiiFSQs8wKTMFKHN6XxB%2FXZGUdpiVJeYIiaeGCQlUoqTWNajumMAakGKdv0FsARkXENcJDBPiOlFv0GFCNXFepH22RAtUgOx%2BX0tHYl0kMOHjsG%2FziNgIV132LyRky9VNsCao3aHwIyV%2Fs8OvvJAX%2F%2BG%2Fxj7ffTQLW16oNNhrZlvQivuXHxCj39ETKLbiuy8pu%2Fn6wCLZt8xBkXytAKXVjUb1nbPbPaxY0t5BazyHh%2FpR2EhUv4WHgAgDOREYZoCk39tXIhvu6lB6b2DbaMAfhf0vP7OKhgY8C1sacOh2bJZO%2BzA42J5%2BqK9gD97uVj7BYt8o%2Bp2S05dK1iT6vEkUtU2iUEidpiQKJJJIzGnDW0ThYb3Xqr2jzVnnW0gyUvTNWZ6ClAXTZyT2kVVujIAiM5BGBcXrgwKSPC3shKJhQgnbE0o8lRg%2FstEXlAw%2F%2BtPe6M8zUJYviHaLJWBwAjoAhL5Eo4glAEx1%2BVg9lYOEm798pnh4TGlXehHIWZ9kbFhfhS%2BeVy7Irovs%2FDHc%2FFE%2FoWcpGjKAtM0fft8gkaikr7xg8RgXD5l6IcVDl8UiBNe4rpOOF4TCczFOEN%2BfnOYEiSP5yJ7nBOl5LfxpewqKgs7UUl8YP2o%2F%2Bud6U7rniY94U4601%2BNNEYPREF4ZLEtktV8Nuo%2FvdEY4kCg%2FU5lwcnRJJ1%2Fl%2FKczSTq3y0I6Z6762TtLsZHCoU2xUfnaCkSEA4UONNwpwMVbubIq8PikyHScUUlxRTxYD5U%2F0wSiP3DWliSWF6O8yFacx5UsKpt7SU%2BwQfibFS4XA4t09XlUWgKVcBG0%2FLHKEKDm0hfGiyXnYsiR%2BfbGlTOqAErrmrkEPkLjGm6k4GO%2BBOThrsbj1zX9DcvGyGxMjeu0jhHHXcMbl6QgR0XS88XREj%2FcDYZ1zQWnxiepRk9vfJI%2Fa%2FtPZtMjHrXD7fV41IL%2BckBJEObaifWqDe9Vc9uj7DquRO%2BQLSrre3Ej8BQTC1NM%2FwNyaD1rOieX4MJjk4K%2B132Px%2F0HgUWZosIyYpAR42FJgcozzxh5hMWCXRYDJEMWj9HxkLnQxsVD5ZxneDwDAYeVHkbwkDrNxg1%2FdXwT5ksn7mAfTmA66iCITjRtFAOr17KZuu03KfzwsGVzpL2mNy8E1BapM5Eyw5TftouC2RGmDrfXZC33PXDlfAmTtbWVtcRfd8bYj0900e%2Be%2FeEVGZWPnqRELOdYLUaTFqOIsLuUCJSgH5xfs5EAAr%2B%2B33%2Bvbo8Rckcr6CksKEZAMR6AEiiD%2BJsLfZYOI3QYDzcR75w06HiB%2F12zXrE6xuA6hut03hqenhrmqs8fH6re0cCcg0o%2BwGLdf%2BfLSodPSofQkeNyKUqGmLz6WbaSJGXZcUD2ULwjO4UYhMS4ghGrIKk10ZemGLG6qElUzGsbqsW9dQlxTUj1yYIxLhjmA1ldkW917JAievF%2FT4STlBaqLEpXoSjuEylVJUUmpRMdr62ES9p8ryEfy6O%2B15mciZNdr58TBf01XBZZ%2BAxxyUbQWh%2FDWx%2BB11kZcfvzgScNBtLm4QxVS7U5LEuwEK9SSTIMPNUN9rzYTANaJxBF1jW1pSIlSZ9moQpXLqmctbqFQTQk9snIaKhWUTCcp%2FC7hcMgHBKLZGQ4%2BssoeXdmsZrI4H7QjhvUNx%2BWHCqTQdv3XXTLiPOzGI0qI6L%2BGkkrDZZwf8q3n7B46MXDeDRypPJ%2Fkir3bgUHkabhtWjoRcN4JHKkWlub0zm9ITmsN9wAHeYDkaO%2BO%2Fx6tYIAg2JuY%2Fx06J1%2BR%2FEMxBN6VPHU5gKLlGmmllC8DFd%2FtAJiYAERnZ9lalT5ECvfhWPPf%2FUE29gMQ3CYVztVrnO7lmoUDPNKZ9%2FfiSHrKatR6Ijo626N6EhcWeO%2BNhCpQsPvYDnHabWtmbU8tIqI%2BGzFYtyQLZVdKkK2KnEhi9iyecOMkmM82C9Sucm7WocFxSgoxkP94v6CvCqZnFVDPq2GdBP9SPcOGdevEauW3Qub40ezbFDtDnAxfg2VgmpXTAyjYdyrEav0i4XdatcwG8YdG1O3N%2Bb%2Fdzk2dvv2Thqb9l6JLXzl2%2FbWdz1IbLiYlI%2FGhqu2DvrkBjNB3Fl%2FEWkoB95gxuuktwzjERJ2iLysZnaCds8g6mdfezgJ8TP2VxqS7OmJZNfb5A5Odhx0NfDZldP442nhvLcLMd%2BmWi%2Fnl5A%2B65K27Rokh1FvbF1HYdMNzFD3PB7f%2BEiVDEl1XZoTbBmZ%2FHfT9U6g%2FtOUpwrhuqOPq5rawJuGJwo9lbdIb5ot1%2B3mzfK8EcRTf2G0juXuAWQdTwOsf3U1Ou9EE3KXxn54O0FlQ64wYilAH%2FKF8D8pk49bY%2FKTxuRUoWZdig9KGAjWPXlpaBj3Qc1Uq6PlGls6DNNh3As18xR0sHVPi4dhPMwHdc9UQZsrUJYbhBPLh0k%2BTl0Y1ceHKt4b5iDNLBwm4ZDtujYuHGFv0MfMgrMr1O7g%2BJg%2FeDKcK0MoXcdXJjz5GI6TtmY2NTFAJvpZj1Nz1nU2hnqcmmI%2Fs51R4frNnzva3htj14DZ7JKedu8Sn3Yz%2BwN8lp5RlhtdsaZkKmXaVRC0EPrFuWLrXMeWEGnpGeKU3j6LGL1Yl7kqZd4484zrmNEEfmoxebTBO1lsxEY24XR97zy5cewAXYLDiBLzM2x1Fn1bCRRNr%2FqKpffjkkSRA0kvjEFH0%2FLj8CCLR9qfiyItYoRIszk15JZPKIGsxf8A)

## [State diagram](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R7Vzfc5s4EP5r%2FJgbkMB2HlMn%2FTGTzmTGnbumb7KRDSlGnBCxub%2F%2BhBEgEKlJY3tx2zwk1krC4ttvtdpdyAjPNrsPnMT%2BZ%2BbRcIQsbzfCtyOE0NiZyD%2B5JFMS18aFZM0Dr5DZtWAe%2FEeV0FLSNPBo0hgoGAtFEDeFSxZFdCkaMsI52zaHrVjY%2FNaYrKkhmC9JaEr%2FCTzhK6ltWXXHRxqsffXVU1d1bEg5WAkSn3hsq4nw3QjPOGOi%2BLTZzWiYo1fiUsx7%2F0JvtTBOI9Fnwu3nBXn6lD18u4v87NvSuv%2F%2B5dOVusozCVN1w2qxIisRkFeRYMvGO19sQimz5Ud5M3HenwjCxVwQkfevgjCcsZDx%2FURs7X%2FywYKz71TrWa1Uj%2Fp2ygXdvXhbdgWWpBllGyp4JofsKlUUU0qGXav2tlYXViJfU1QpI4og6%2BrKNYbyg4LxFZCiHpB6kmOqybjw2ZpFJLyrpTrUOTqBJORNGKwjKVswIdhGdtDIu8kZnl8kplEhURY0%2FSHsnKWRR%2FObsPaz5G1%2F1RuPeeMvt2ze7vTO20y1itvK76WhuoSlfEkPc85QsbRswtdU%2FGAq7qYCpyERwXNzHV2KVVMfWCC%2FuaYQchsUwuMWN4p1qVktelTL%2BHnGYIMxH%2BU1y82pTR6NGls%2FEHQekz3cW7kDH8ekKtsoTWpqmlRldrpNuaeyqeufMKEmyesx94zFCr8nKkSmLIakgjUNr7aL2hQe9b7X2UUH3w%2BaitPTLsZvtIs3KadkwjC0Yw1POxNQ7dgg2tkF4qv2WfMoslWrJm9ko5P4oVNqdAqpUcdwF2QpAhYZei4Padxnm0Uql%2FEupjyQi6C8lj7Uok5%2FoimVqBPIUuK6H38EX%2BO0j28T1%2FQ1qMPXtH300eB1gXczazxp8d8%2B5HH2LU2RxzYL3NMsHEizGBtmcRPHYbYP%2Brj8PRepR9UBTtcuBOlRk%2FT2pOOAZXWQ3jkV6ScHwPsiGcuHCB2eduwXZ4WuTGj8cbA9dpJpz53ERpBbydSwhpCtA9PBAvB%2FjNqxGTj%2Fx8AOEyo4s1FfMoP6RXsyJP2cMTzrrx8XVD8wyY3L9B%2F9dQoaopXL1DyIyOI8pcdW8leaUPMwdQnR2tQZWrSGoMM1MO%2FTN1eBYL2Pma14KRCrtbKnL18q%2BG0LiOxuK0rD0FEagjlqKVdRu4dHreeQq4Bz%2F25fAwGNNcplagbSHWwP3TwcBB2JYHQpJ6lj0rxvSI3eWjx9G83NmPrG23TE1EOjuW2NhxZxlwcsDcsZp%2FkzGMi6p0nSUQoYwP4w7qoinxc30EjLesX%2BULnP6kB59kgL9Y20EGh5E%2F%2Buxef%2B%2BrFA9XMx5WcQ3YBmKcpl6j65byXZY%2Bli32tfRKLCdTqcz1kTFQ6MIcAnKlDv6jHoRuVcfBlvcs7TQW%2BlggbXzqBqU%2Bc8HfTWD2jtA5mPvv4qHsjGg8uVYwfCGo7J6r45bwya68CwadqGK0GDL%2Bnh675KfetWtZ96wznJtAFx%2FlR%2Fol259XLAdSv9M2m9ZXNg%2BFWZ4qgJVaygptcx3iCY%2FjaWDZptQGY161fxV%2B2I6aqr2nXe0q75UOLfAd1KyS1J%2FAUj3DNgh3giy2qFmi54ntPMtXP6b0qTQTz8alcsGgxg2DyGPhdMS9LFE10W%2FgEauHZC%2FcqGB84sXuavzkYe4UNAzG6%2FHHpVcQ8OMnNXU1wLB1O6Gbdhg0ft2kDtgbNVEJrvRw6BZ%2BCGWV64Y0cTZBjbmY0H93xNkaxqOc51kAhOOg95EKi1jxudaYXzotbhBMpydOeTjkMgm3NCsslm%2FW8dihCv%2Fu8Y%2BO5%2F)




# running application
## FRONTEND
npm install

## Development
npm run dev

## Production
* npm run build
* npm start

## Docker frontend (if you have environement setup)

* npm run docker
* npm run docker-start

docker currently running in detach mode so you will need to add the following under environment variables

* ENV NEXT_PUBLIC_API_BASE_URI ACTUAL_BASE_URL

# BACKEND

Visual Studio
* select web.host as startup project
* build application
* run application under IIS Express

# FRONTEND-CI

* npm run ci

# Setup for husky
In the client directory run the following command
* npm run prepare
  