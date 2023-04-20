# MapAbility

Mobile frontend for the MapAbility app. 

(Make sure to check out the backend [here](https://github.com/eric-lu-VT/mapability-backend)!)

## Inspiration
We saw how _inaccessible_ much of the Dartmouth campus can be after speaking to some of our friends with disabilities. Our idea for MapAbility was born to help members of the disabled community find nearby accessible resources and to facilitate actions for them that many of us take for granted.

## What it does
MapAbility allows users to find, mark, and rate nearby accessible resources. Users can locate specific types of landmarks – whether parking spaces, bathrooms, or elevators – at their position, or to scout near distant locations. Along with proximity, location markers display an aggregate of users' accessibility ratings, so users may better understand how accessible various features are. Users are also able to place location markers on the map and rate facilities. The app is a community of people helping and receiving aid from other users.

## How we built it
We first designed a mockup for the app on Figma, paying attention to Apple's accessibility standards and other considerations for physical and visual disabilities. Then, we built the app on a MERN stack, using React Native for the frontend of the app.

## Challenges we ran into
One of our biggest challenges was making an app with the primary goal of accessibility and ease of use. This is unfortunately not a large enough consideration in the modern technology scene, so designing and developing a solution that could be easy for **anybody** – with **_any_** type of disability – to use was a great learning experience.

We were also relatively new to mobile development, so it was a challenge to learn the framework and incorporate our previous skills into the project. In the end, we each found a way to both contribute our knowledge and learn from the work.

## Accomplishments that we're proud of
We are really proud of our teamwork. Even though we had little experience working with each other in the past, we were able to quickly find each others' strengths and apply our skills to the project. The whole of our team was greater than the sum of its parts because we were excited to work together and motivated to make MapAbility to benefit people.

## What we learned
Through this project, we learned a lot about making products with an explicit focus on accessibility. We learned to try to see our landscape in the lens of accessibility and to understand how different people may be affected by different, seemingly small details around us. That philosophy pervaded both our motivation and our implementation for MapAbility.

## What's next for MapAbility
Currently, MapAbility only allows the user to mark, review, and locate handicap-accessible bathrooms. However, the infrastructure could be easily extended to accommodate different landmarks, such as reserved parking spaces, ramps, and elevators. This could be a simple step to making the app much more beneficial to those with disabilities.

One lofty goal for MapAbility is the consideration of other types of disabilities. Currently, the app best attempts to service those with physical and visual disabilities; however, with attention to more categories of disabilities, like hearing or speaking, MapAbility could be a general source of resources for people with disabilities.

Finally, MapAbility could greatly benefit from more interaction with members of the disabled community. While we tried our best to design an app that would work for anybody, we have a lot to learn about the difficulties people may experience with disabilities. With user feedback, we could better tune the design and implementation of MapAbility to users' needs.


## Architecture
### Tech Stack
- [Expo Go](https://expo.dev/client)
- [React Native](https://reactnative.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [axios](https://github.com/axios/axios)
- [TypeScript](https://www.typescriptlang.org/docs/)


### File Structure
    .
    ├── ...    
    ├── public
    ├── src                
    │   └── assets             # static assets   
    │   └── components         # reusable components across several screens
    │   └── hooks              # useAppDispatch, useAppSelector
    │   └── navigation         # defines navigation flow
    │   └── redux              # Redux store and setup
    │   └── screens            # individual pages
    │   └── types              # TS types
    │   └── utils              # utility folder containing helper files
    ├── tsconfig.json          # TypeScript configuration
    ├── package.json           # yarn config
    └── ...

For more detailed documentation on our file structure and specific functions in the code, feel free to check the project files themselves.

## Setup Steps (example)

1. clone repo and `yarn install`
   - We are using yarn because npm has issues with installing peer dependencies, which in turn causes issues when you eventually want to deploy to TestFlight
2. Change `SERVER_URL` endpoint to exact IPv4 address + port used by backend
   - You can view your IPv4 address by running `ipconfig` in command terminal
3. App should be ready for use now
   - `yarn start` to run with hot reloading
      - If you are getting "This is taking much longer than it should..." error, try doing `expo start --tunnel` instead. This error happens sometimes when trying to run on Dartmouth eduroam.

#### Redux Debugging

1. Download [react-native-debugger](https://github.com/jhen0409/react-native-debugger/releases) release
2. Run `.exe` file
3. Hook to port 19000

#### Linting

ESLint is set up in this project. To keep code clean, always remember to run `yarn run lint` and fix any lint problems before merging into master.

## Authors
* Eric Lu '25
* Aneesh Patnaik '25
* Sonia Bendre '25
* Rishav Chakravarty '25
