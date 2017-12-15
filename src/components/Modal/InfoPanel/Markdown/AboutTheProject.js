const aboutTheProject = `The goal of this project was mainly to teach myself how DataLoader worked, with respect to 
batching and caching, which required a high-level understanding of how Node works with V8 and libuv. I felt that 
DataLoader was a great library to do a tutorial on because it provides a practical example of how to interact with the 
event loop. DataLoader is also an easy library to read / learn, and full credit for that goes to the people at Facebook
 (Lee Byron et al.) for going to the trouble of writing it in a highly accesible manner 
 (note: all the DataLoader.js comments were written by them, I didn't add any).     

Regarding the process of building Visualise DataLoader, I've written some thoughts below about the key packages I used
 and why I picked them / challenges I faced.


<ul>

  <li><a href="#React%20/%20Create%20React%20App%20-%20View%20Library%20/%20Boilerplate%20Generator" data-internalLink="true">
    React / CRA
  </a></li>

  <li><a href="#Emotion%20-%20CSS-in-JS" data-internalLink="true">
    Emotion (css-in-js lib)
  </a></li>

  <li><a href="#MobX%20-%20State%20Management" data-internalLink="true">
    MobX
  </a></li>

  <li>
    <a href="#React-MQL-Manager" data-internalLink="true">
    React-MQL-Manager (which I wrote while building this!)
    </a>
  </li>

  <li><a href="#React-Markdown" data-internalLink="true">React-Markdown</a></li> 

  <li><a href="#React-Syntax-Highlighter" data-internalLink="true">
    React-Syntax-Highlighter
  </a></li>  

  <li> <a href="#Anime.js%20&%20React-Transition-Group" data-internalLink="true">
    Anime.js with React-Transition-Group
  </a></li>

  <li> <a href="#React-Loadable%20&%20React-Router%20v4" data-internalLink="true">
    React-Loadable & React-Router v4
  </a></li>


</ul>

# React / Create React App - View Library / Boilerplate Generator

Links: [React Docs](https://reactjs.org/docs/hello-world.html), [CRA Github](https://github.com/facebookincubator/create-react-app) 

CRA provided a really quick starting point, but there's plenty of literature on this all over the net and I don't plan to rehash it. Instead I'll discuss why I ended up ejecting. There were three things I wanted that CRA lacked: decorator support (understandably absent, the proposal has undergone changes), babel-plugin-emotion, and to experiment with the \`do\` statement. I mostly wanted to try the latter because it allows you to write \`if\` inside JSX:

\`\`\`
<div>
  {do 
      { 
        if(condition){
          // conditional logic
        } else {
          // etc.
        }
      }
    }
</div>
\`\`\` 

Possibly unpopular opinon: I don't like do statements in JSX, and I'll tell you why. 
On the one hand, it avoids the frustration of dealing with falsy values (0, false) in a ternary, and that's great. 
On the other: I really like terse functional components, which is where most of my 
conditional rendering takes place. What I want from functional components is the ability - at a glance - 
to know exactly what is being rendered. 

I ultimately didn't use \`do\` (I think at all) because aesthetically it looks like a bracket jungle, 
and any extensive conditional logic makes the whole statement span too many lines for my taste. 
Personally I find this particularly undesireable in functional components, which is where most of my conditional  
rendering occurs (see Emotion section for why brevity matters to me). In any case, there are other uses for the \`do\` 
expression (see: [Proposal: "Statements as Expressions" using do - Nicolás Bevacqua](https://ponyfoo.com/articles/proposal-statements-as-expressions-using-do)) so I'm not ruling them out entirely. 

To touch on decorators; MobX without decorators is certainly possible, but it's less concise and harder to read. Compare:

\`\`\`
class SomeStore {
    @observable someProp = someValue
}
\`\`\`
vs
\`\`\`
class SomeStore{
    constructor(){
        extendObservable(this, {
            someProp: someValue
        })
    }
}
\`\`\`

Lastly, I believe there are packages to add missing features from CRA in without ejecting, but I wasn't overly worried about maintainance.  

# Emotion - CSS-in-JS
Links: [Github](https://github.com/emotion-js/emotion), [Website](https://emotion.sh/), [React-Emotion Github](https://github.com/emotion-js/emotion), [Emotion-Themeing Github](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming)

I like to think of Emotion as CSS's come-to-Javascript moment. In my opinion CSS-in-JS generally shines when paired with the container and presentational component pattern. When all of your logic is in container components, you are able to write very terse stateless functional components and to then bundle the applicable styles beneath. I've found that this enables me to very quickly grasp what / how my rendered content is being styled with no digging around for a corresponding \`.css\` file, and the actual functional React component adds (relatively speaking) very little length to the file.

Emotion in particular shines because it builds so wonderfully on Sunil Pai's glamor. Emotion gives you the option to write CSS in template literals (ie no camel-casing, no quotes around values) or as objects, which may be more desirable when using lots of interpolation (see: [Template Strings vs. Objects in CSSinJS - Oleg Slobodskoi](https://medium.com/@oleg008/template-strings-vs-objects-in-cssinjs-4028ecc420b2)). You get all the expected CSS functionality (pseudo selectors, nested selectors, global injection as demonstrated here: ), as well as the ability to compose styles:
\`\`\` 
const row = css\`
  display: flex;
  flex-flow: row nowrap;
\`;

const rowSpacedApart = css\`
  \${row} 
  justify-content: space-between;
\`;
\`\`\`

Applying the css, e.g. rowSpacedApart, is as simple as \`className={rowSpacedApart}\` on your component,  which avoids in-line clutter.

Theming is available in a seperate package. Add in react-emotion and you get styled components too, meaning you can access props directly in your css. Remember to capitalise the name of your styled component as it's a custom React component, and not to use unsanitised user input in your styling:
\`\`\`
const SomeDiv = styled('div')\`
  color: \${props => props.color};
\`
\`\`\`

I've barely scratched the surface of the benefits of CSS-in-JS, or Emotion, but in any case it's a pleasure to write. The only drawbacks for me right now are lack of auto-complete / linting, I'm not sure if these are supported in some way yet. 

To see how CSS translates to emotion, try [using Ritesh Kumar's transform.now.sh](https://transform.now.sh/css-to-emotion/).
Note that I belive the css-to-emotion feature is a beta. Also see a handy demo of the library by the lead author 
of Emotion, Kye Hohenberger, on [codesandbox](https://codesandbox.io/s/7kqnvz4781).

No CSS framework was used to make this project. That's probably evident as everything's a bit square. My design skills could use some improvement.

# MobX - State Management
Links: [Docs](https://mobx.js.org/), [Github](https://github.com/mobxjs/mobx), [MobX-React-DevTools Github](https://github.com/mobxjs/mobx-react-devtools), [MobX-State-Tree Github](https://github.com/mobxjs/mobx-state-tree), [Apollo-Client Github](https://github.com/apollographql/apollo-client)

I'll preface by saying I have used Redux, Reselect, Redux-Saga and thunks, still use component state where it's adequate, and  that this project was my first extensive use of MobX. However, on the topic of my MobX experience, this project didn't require the use of asynchronous actions, so I haven't explored MobX fully. I can only weigh in on using these state management libraries in the context of solo-developer projects, which is significantly different from team projects. 

To my mind, MobX leans towards productivity via more "magic" than Redux. It isn't quite as easily debugged as Redux due to lack of immutability, and a need to understand how MobX tracks mutations behind-the-scenes, as opposed to Redux's declarative reducers. With this said, you can opt-in to some conventions that assist debugging, namely by restricting yourself to \`actions\` to effect mutations, ideally defined in your domain stores and called from components. This allows you to track state changes with the MobX Devtools, and is easier to trace, and as a result I had no issues with mutable state at all.

Redux, out of the box, is the opposite - not much magic exists and it shines in terms of debugging, but you pay for it with writing a LOT of boilerplate scaffolding and careful (immutable) state updates via your reducers. 

The tricky part when evaluating both tools is that you can compensate for the weaknesses of both libraries. The MobX ecosystem now includes MobX-State-Tree, which allows you to use the redux-dev-tools with MobX via immutable snapshots of mutated state (I haven't used it yet so I can't elaborate much). My hope is that this provides a nice middle ground between productivity and easy debugging. On the other hand, I'm certain numerous abstractions over Redux exist (which generate reducers, action creators, action types). For a relatively small project like this one, I'd much rather use MobX and not get bogged down in boilerplate.  

Note: Devtools in MobX are heating up, just as I was wrapping this up some new developments came to light: [MobX Wiretap](https://wiretap.debuggable.io/). Also, the Mobx-Devtools for chrome/firefox plugins now support state tree. If you use GraphQL, see also [gql-to-mobx](https://github.com/mhaagens/gql-to-mobx).

# React-MQL-Manager

Links: [Github](https://github.com/AWebOfBrown/React-MQL-Manager), [Demo](https://codesandbox.io/s/p93xmm0zmm)

I wrote this little package while putting together Visualise DataLoader. 

Simply put, I wanted to put my queries in one place and access them anywhere in my component tree, and this does that.
It only listens to changes for each query once, which is different to some similar libs that will create a listener
everywhere in the tree that you want access to the viewport's size. Debounce is built in, as are a \`Provider\` and
Higher Order Component / Render Props component  to access the queries when not using a state management solution. 


# React-Markdown
Links: [Github](https://github.com/rexxars/react-markdown), [Website](https://rexxars.github.io/react-markdown/)

This is the markdown component I've used for the modal panels you're reading now, and the main commentary section. There were two issues I faced:

The first was getting the \`.md\` files into the component. I tried using raw-loader (as I'd already ejected - so had freedom to fiddle with CRA's ejected webpack config) to no success, it merely spat out a string with the relative path to the \`.md\` file when imported. As a result, I temporarily settled on using \`fetch()\`, which felt awful because it was re-fetching the markdown each time I'd load the "about" tab or a different section of the visualisation. Eventually it clicked that all I needed to do is throw the markup inside template literal strings, escape any (\`) backticks, and export the giant string. I felt pretty stupid afterwards. 

The second struggle was adding in attributes to DOM elements. After implementing my own solution, I later dug around and found that you can specify a custom renderer to take care of this, as described [here](https://github.com/rexxars/react-markdown/issues/69#issuecomment-289860367). Personally, I just created a container component that calls \`querySelectorAll()\` on a ref to the markdown and then I manually add/fix any attributes I want directly on the desired DOM element types (e.g. adding id attribs in order to anchor headings). You're probably better off using the custom renderer method.  

# React-Syntax-Highlighter
Links: [Github](https://github.com/conorhastings/react-syntax-highlighter), [Website](http://conor.rodeo/react-syntax-highlighter/demo/)

This tool was super useful to depict a code-editor. Comes with a variety of themes, though I edited parts of one to fit the site's colour scheme. It supports a ton of languages, unfortunately I don't think Flow is covered though so the DataLoader tab looks a little rough. 

While this library has a sister package with a pluggable virtualised renderer, I couldn't use it on this project because it renders the line numbers and code lines seperately, meaning they scroll seperately. I didn't spend a lot of time digging into how to get around this unfortunately, so DataLoader.js takes a bit to render as each line can have 3-4ish components wrapped by a line component. I was seeing roughly 400ms of rendering on my ageing desktop , though that's with React in development mode.     

# Anime.js & React-Transition-Group
Links: [Anime Website: links to docs / github](http://animejs.com/), [RTG Github](https://github.com/reactjs/react-transition-group), [RTG Website](https://reactcommunity.org/react-transition-group/)

I haven't done much animation, and I wanted a quick abstraction with no licensing issues so that I could use it on future projects without any issues. I based my decision to use Anime off of this great article: [What's the most developer-friendly React animation library? - Alex Holachek](https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/). For more intricate / expressive animations you probably want GSAP, as is the conclusion reached in Alex's article. 

 I couldn't find many examples of how to integrate Anime.JS with React components, but eventually came to an imperfect solution which caters to animating a single DOM element, using refs.
 
 If I were to tackle this project again I'd handle the integration differently, primarily to make it easier to animate a group of child components dynamically based on their mount state. If you choose to use Anime.JS with React and want some pointers, feel free to ping me using my contact info in the left panel. 

 A few generic tips:
 * You virtually never need to use \`findDOMNode\` from \`ReactDOM\`. Use refs if possible as \`findDOMNode\` is relatively slow. Even if you're rendering a third-party component which won't pass through a ref, you can usually put a \`ref\` on a containing element and access it's child elements. I never needed \`findDOMNode\`. 
 * You can't put a ref on a stateless functional component directly as it has no instance, you can put one on any child class components or regular DOM elements. This means that you don't need your presentational components to be rendered via classes (as long as the SFC renders, at the least, a \`div\`).
 * If you're a performance nut, you don't need to use an inline function to attach a ref. Just declare a class property \`bindRef = ref => this.DOMNode = ref\` and pass that callback to a containing element, i.e. \`<div ref={this.bindRef}/>\`.
 * Refs are attached after the component mounts, but before componentDidMount, meaning you can instantiate an Animations class at CDM and pass in the ref to its constructor, as described below.
 * I prefer to organise my animations for each container in an Animations.js file with an Animations class, and each animation as a class method. Optionally, you can instantiate this class from your container's \`componentDidMount()\` like so: \`this.animations = new Animations(this.DOMNode)\` which can save you having to pass your referenced element in every function calling an animation (remember to set \`this.DOMNode\` as a property in the Animation class' constructor function). May not work quite as well for dynamic animations on multiple children, in which case you could pass in child elements as paramaters when calling your Animation methods from the container component. I don't know if this is a good method of managing animations, I merely found it convenient for keeping timelines internal to the Animations class and keeping my containers free of any animation logic. 
 * If you call animations on hover as I have done, use a debounce function. I used debounce all over the place.
  
# React-Loadable & React-Router v4
  Links: [React-Loadable GH](https://github.com/thejameskyle/react-loadable), [React-Router GH](https://github.com/ReactTraining/react-router), [React-Router Docs](https://reacttraining.com/react-router/)
  
  I hadn't explored lazy loading / code-splitting much previously so I figured I'd try React-Loadable as a learning experience. Both libraries are only used for this "about" modal. Because this is the only
  split content from the main bundle, I preload it with React-Loadable once the window's \`.load\` event fires. It's awesome how quickly you could improve performance in a big app just sprinkling around dynamic imports (via React-Loadable to abstract error / loading props etc.).

  I've used React Router v4 before and it works perfectly for me. It also inspired me to try using render props, which I've used with a custom component that utilises MediaQueryLists to check whether the device or viewport are sufficiently wide.   

# The End
  That about wraps things up!
  If you managed to read through the whole tutorial and this about section, well done!! Please do feel free to say hello
  over Twitter :). 

  Many thanks to all the open source library creators / maintainers / contributors etc. that go way beyond this list of packages. 
 `;

export default aboutTheProject;
