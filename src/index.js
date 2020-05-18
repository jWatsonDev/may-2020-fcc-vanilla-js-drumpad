import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

import CodeSlide, { Themes } from './Components/CodeSlide';

import {
	Deck,
	Slide,
	Appear,
	CodePane,
	FlexBox,
	Box,
	Image,
	Heading,
	ListItem,
	OrderedList,
	Quote,
	Text,
	UnorderedList,
	Grid,
	Notes,
	FullScreen,
	Progress,
	Markdown,
	Link,
	createTheme
} from 'spectacle';

import Logo from './assets/images/fcc.svg';
import VSCode from './assets/images/vscode.png';
import GitHub from './assets/images/github.png';

const theme = {

};

const FillBox = styled(Box)`
	flex: 1;
	text-align: ${props => props.textAlign ? props.textAlign : 'left'};
`;

const ListItemLogo = styled.img`
	width: 2.5em;
	height: auto;

	&.github{
		border-radius: 100%;
		background-color: white;
		border: 1px solid white;
	}
`;

const template = () => (
	<FlexBox
		justifyContent="space-between"
		position="absolute"
		bottom={0}
		width={1}
	>
		<FillBox padding="0 1em">
			<FullScreen />
		</FillBox>
		<FillBox>
			<Text fontSize="1em" bold color="#808080" textAlign="center" margin="8px">
				<span style={{ color: '#505050' }}>Author:</span> Jay Watson | Template: <a href="https://www.braedin.com/" target="_blank" style={{ color: '#505050' }}>Braedin.com</a>
			</Text>
		</FillBox>
		<FillBox padding="0 1em" textAlign="right">
			<Progress />
		</FillBox>
	</FlexBox>
);

const Presentation = () => (
	<Deck loop theme={theme} template={template}>
		<Slide backgroundColor="#0a0a23">
			<Heading size={1}>
				<Image src={Logo} width="100%" />
			</Heading>
			<Heading size={1} fit caps color="white">
				May 2020: Vanilla JavaScript Drum Machine
			</Heading>
			<Link target="_blank" href="#">
				<Text fontSize="1.5em" bold caps color="white">
					View on Github
				</Text>
			</Link>
			<Link target="_blank" href="https://codepen.io/">
				<Text fontSize="1.5em" bold caps color="white">
					If you don't have CodePen, signup please 🙏
				</Text>
			</Link>
			<Text fontSize="1em" bold color="#505050">
				Navigate with arrows
			</Text>
			<Notes>Let's get started!</Notes>
		</Slide>
		<Slide backgroundColor="#0a0a23">
			<Heading size={1} caps fit color="primary">The Foundations</Heading>
			<OrderedList>
				<ListItem>
					HTML - Hyper Text Markup Language - Skeleton
				</ListItem>
				<br />
				<ListItem>
					CSS - Cascading Style Sheets - Make Up
				</ListItem>
				<br />
				<ListItem>
					JS - JavaScript - Muscle
				</ListItem>
			</OrderedList>
		</Slide>
		<Slide backgroundColor="#0a0a23">
			<Heading size={1} caps fit color="primary">freeCodeCamp Vanilla JavaScript Drum Machine</Heading>
			<UnorderedList>
				<ListItem>
					<Text><a href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-drum-machine" target="_blank" style={{ color: '#fff' }}>freeCodeCamp project page</a>
					</Text>
				</ListItem>

				<ListItem>
					<Text>Fork this <a href="https://codepen.io/freeCodeCamp/pen/MJjpwO" target="_blank" style={{ color: '#fff' }}>"Starter" fcc Drum Pen CodePen.</a>  This has built-in tests for you to test your app!
					</Text>
				</ListItem>

				<ListItem>
					<Text>
						<a href="https://codepen.io/jwatson2pt0/full/LYpJqNz" target="_blank" style={{ color: '#fff' }}>"Completed" JS Calculator</a> - Don't look at this yet! Note that freeCodeCamp also has a completed example that is built with React. Ours will be vanilla JavaScript!
					</Text>
				</ListItem>
			</UnorderedList>
		</Slide>

		<CodeSlide
			backgroundColor={"#0d1d2e"}
			theme={Themes.dracula}
			lang="html"
			code={require("raw-loader!./assets/examples/drum-machine/index.example").default}
			ranges={[
				{ loc: [0, 20], title: "HTML - notice, there is not much!" },
				{ loc: [0, 20], backgroundColor: "#223b57", note: "We'll be building most everything with JavaScript." },
				{ loc: [12, 14], backgroundColor: "#223b57", note: "We've given this div an id of drum-machine per the fcc user stories (when you're building this, make sure and follow them!). This div will wrap our drum machine." },
				{ loc: [13, 13], backgroundColor: "#223b57", note: "This div will contain info re the drum key that the user taps, per the fcc user stories! For now, put whatever you want. This is starter text!" },
				{ loc: [0, 20], backgroundColor: "#223b57", note: "Keep going..." }
			]} />

		<CodeSlide
			backgroundColor={"#0d1d2e"}
			theme={Themes.dracula}
			lang="css"
			code={require("raw-loader!./assets/examples/drum-machine/styles.example").default}
			ranges={[
				{ loc: [0, 500], title: "CSS - Make it look good." },
				{ loc: [0, 500], backgroundColor: "#223b57", note: "I encourage you to do your own CSS!" },
				{ loc: [0, 6], backgroundColor: "#223b57", note: "Here's what's happening... We are setting the body to display flex. We are centering with align-items (vertically) and justify-content (horizontally/side-to-side). Of course, we want the body to be the entire height of the browser window, hence we are setting the height to take up the entire height of the viewport (vh: 100)." },
				{ loc: [8, 21], backgroundColor: "#223b57", note: "Note that the .dram-pad elements do not currently exist. They will, though. We'll build and add them with JavaScript." },
				{ loc: [8, 21], backgroundColor: "#223b57", note: "Nothing fancy. We are setting the width, height, background, etc. Note that we are also using display: flex and are centering everything within our boxes both vertically and horizontally. We are just going to stack these elements on top of each. Simple design. I'd really like it if you did something cooler!" },
				{ loc: [23, 27], backgroundColor: "#223b57", note: "We want our #display box to look differently than our .drum-pad boxes. Note that these styles will override our other styles as they are below them in our stylesheet." },
				{ loc: [29, 31], backgroundColor: "#223b57", note: "When a drum-pad is tapped, we want to temporarily give it an active class, in which, case we'll give it a red-ish background. You get the idea." }
			]} />


		<CodeSlide
			backgroundColor={"#0d1d2e"}
			theme={Themes.dracula}
			lang="js"
			code={require("raw-loader!./assets/examples/drum-machine/js.example").default}
			ranges={[
				{ loc: [0, 500], title: "The JavaScript" },
				{ loc: [0, 55], backgroundColor: "#223b57", note: "This is simply our data. To get started, go to freeCodeCamp's completed example or my completed examples and get your data. Within this array, each object contains a keyCode, keyTrigger, id, and url (drum sound)." },
				{ loc: [57, 57], backgroundColor: "#223b57", note: "Use document.querySelector to create handle to reach into the DOM (document object model) and manipulate the #drum-machine element." },
				{ loc: [59, 73], backgroundColor: "#223b57", note: "Use forEach syntax to loop over our data set. For each element within our data array, we want to create a new div wrapper (with drum-pad class), an audio element, and a text node." },
				{ loc: [60, 62], backgroundColor: "#223b57", note: "Use document.createElement to create a new div on the fly. Use classList.add to give it a class of drum-pad (per the requirements/user stories). Also, give our div an id. Note that we are using a regular expression to strip the id of any special characters. If you scroll up and take a look at your data set, you'll note that there's at least one id that contains special characters, which would cause problems for us." },
				{ loc: [64, 67], backgroundColor: "#223b57", note: "Use document.createElement to create a fresh audio element. After which, set the id to the keyTrigger property of our data, add the 'clip' class, and set the src to the url property (this is our audio!)." },
				{ loc: [69, 69], backgroundColor: "#223b57", note: "Append the audio element within our div. With this step, we are inserting our audio element within our div." },
				{ loc: [70, 71], backgroundColor: "#223b57", note: "Create a text node for our drum pad text (e.g. Q, W, E, etc.) and then append it to our div (insert inside)." },
				{ loc: [72, 72], backgroundColor: "#223b57", note: "Now, append our dynamic div to the #drumMachine div. At this point, your screen should be populated with new drum machine divs, but our drum doesn't currently work. Let's change that." },
				{ loc: [75, 80], backgroundColor: "#223b57", note: "First, we want to ensure that when a user types certain keys, she can play our drum set. In order to do this, we'll add a 'keyup' event listener to our document. Every time, the user presses a key and it comes up, we'll know! Note that we are passing the user event into our anonymous function. We need that in order to determine which the key the user hit." },
				{ loc: [76, 76], backgroundColor: "#223b57", note: "Declare an object. Note that this object will only be set if the user event's keyCode (e.keyCode) is found within our array of objects (keyCode property). The build-in, magical find method returns the first element that is found within an array of objects. So, if the keyCode is found, it will set it to that particular object, otherwise, 'obj' will NOT be set (this is important)." },
				{ loc: [77, 79], backgroundColor: "#223b57", note: "If 'obj' is set, then we want execute a playDrum function and pass in the particular object keyTrigger property. Oops. We need to build that function." },
				{ loc: [86, 98], backgroundColor: "#223b57", note: "Declare your method and let's start building." },
				{ loc: [87, 87], backgroundColor: "#223b57", note: "Let's ensure that the key that is being passed in is actually a valid property within our data array of objects. This step wouldn't be necessary within our current usage, but will be later on." },
				{ loc: [89, 89], backgroundColor: "#223b57", note: "If the object is set, then we know we have valid, safe data to play. At which point, we reach into our document and grab that particular audio element by id (note that it was dynamically generated earlier when we looped through our data...we set the id then) and then we'll execute the built-in play method (exists for audio/video elements), which will play a sound!" },
				{ loc: [90, 90], backgroundColor: "#223b57", note: "Set the inner text within the display element to id/description of the audio element that is being played!" },
				{ loc: [91, 91], backgroundColor: "#223b57", note: "Give the div with the id that contains our audio element and class of active. I know there is a lot going on here. This is also using a regular expression (like we used when we set the id) to strip the data of special characters. Once, the id, is found, we add the class of active. Note that the active class (in css) has a red-ish background." },
				{ loc: [92, 96], backgroundColor: "#223b57", note: "Use the setTimeout method to remove all active classes after 200 milliseconds." },
				{ loc: [82, 84], backgroundColor: "#223b57", note: "We need to add one more event listener. Add it to the drumMachine element, now we know when a user clicks within that element." },
				{ loc: [83, 83], backgroundColor: "#223b57", note: "If a user clicks on that element, pass in the innerText (we set that on lines 71-72). Our playDrum function correctly checks if said text is found within our data array as a keyTrigger property, and, if so, will proceed to play that sound." },
				{ loc: [0, 500], backgroundColor: "#223b57", note: "You should now have a working drum machine! Congrats!!" }
			]} />


		<Slide backgroundColor="#0a0a23">
			<Heading size={1}>
				<Image src={Logo} width="100%" />
			</Heading>
			<Text fontSize="1.5em" bold caps color="white">
				Awesome sauce! If you didn't already, you should at least style the drum machine as your own!
			</Text>
		</Slide>
	</Deck>
);

render(<Presentation />, document.getElementById('root'));
