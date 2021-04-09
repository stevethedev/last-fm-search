# Last.fm Search

This TypeScript project provides a basic GUI for searching Last.fm for
artists, and displays their bio when selected.

## Running the application

1. Clone the repository to some system.
2. Build the application `npm run build`
3. Serve the application `npm run start`
4. Access the application `http://localhost:8080`

## Things I would've liked to do

1. **More testing.** I have some token testing in place, but nothing substantial. I cut testing for time.
2. **More UI beautification.** The styles on this are pretty rough, and they could do with a UI designer's touch.
   In particular, I think some subtle (~100ms) transitions in certain areas would improve the user-experience.
3. **UI Component Organization.** I used a top-down approach to iterate on the components instead of a bottom-up
   approach. It works for a quick project, but I'm not happy with the specialization of some components.
4. **Predictive API Loading.** I started working on pre-loading, but I cut the effort for time. I also would
   have liked to use this API to get predictive-text in the search area, but it was outside of the scope
   of this project.
5. **Better commit messages.** My commit messages aren't exactly thoughtful or useful for detailed record-keeping.

## Things I got hung up on

1. **Functional Components with Hooks.** It took me a bit to acclimate how hooks worked in React's
   Functional components. I figured it out, and I think I prefer the functional approach to the
   traditional class-based approach.
2. **Authentication.** I got side-tracked following the "get an API key" instructions and wound up
   implementing an authentication workflow where the API `secret` was injected at runtime, the 
   `token` was pulled from the URL's `search` property via a RegExp, and the `session` token was
   stored locally in the application's state. Then I realized I didn't need to sign requests and
   pulled all of that unnecessary code out.
   
## Things I think I did well

1. **Store.** The store could be better *organized*, but using functional hooks let me isolate the business
   logic away from the components and get a clean separation of concerns. I also hooked the reducers up so
   they automatically register themselves to get decent compartmentalization without a lot of boilerplate.
   The end-result allowed me to isolate the Redux API and operate against a convenient and strongly-typed
   "internal" API that "just works."
2. **CSS Modules.** Not a *huge* deal, because the styles are pretty basic, but I was able to isolate the
   styles into standalone CSS modules, pull the CSS class-names into my React components, and get some
   automated CSS-mangling so that the UI doesn't interfere with each other. The result is a clean TypeScript
   experience that isolates it from the CSS while still being able to ensure the classes it references
   do, indeed, exist.
3. **Strongly typed API requests.** This is another area that I would've liked to improve, because an
   application's I/O is one of the vulnerable spots where junk data can get into a system—and I didn't
   duck-type that data nearly as aggressively as I think I should have—but the APIs are otherwise
   reasonable. Components that interact with the API-wrapper have no knowledge that these calls are
   hitting the web.
4. **One-way data flow.** This relates back to the Store, but one-way data flows are great for debugging
   a system. The UI components do not directly modify any of the data structures. They call functions that
   modify the state; then the state is pumped back into the components to trigger UI updates. This allows
   each component to react to application-wide state changes without having to manually route the data
   between parents, children, and siblings.
5. **Functional approach.** I purposefully stayed away from classes and stuck to objects and pure functions.
