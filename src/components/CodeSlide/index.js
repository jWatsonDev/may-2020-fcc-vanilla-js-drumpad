import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Slide as SpectacleSlide } from 'spectacle';
import styled from 'styled-components';
import Prism from 'prismjs';
import padStart from 'lodash.padstart';
import Tween from 'component-tween';
import raf from 'component-raf';

function highlightCode(code, lang) {
	if (Prism) {
		return Prism.highlight(code, Prism.languages[lang]);
	} else {
		return code;
	}
}

function scroll(element) {
	return { top: element.scrollTop, left: element.scrollLeft };
}

function getHighlightedCodeLines(code, lang) {
	return highlightCode(code, lang).split('\n');
}

function scrollToElement(element, x, y, options) {
	options = options || {};
	const start = scroll(element);
	const tween = Tween(start)
		.ease(options.ease || 'out-circ')
		.to({ top: y, left: x })
		.duration(options.duration || 1000);

	tween.update(function (o) {
		element.scrollTop = o.top || 0;
		element.scrollLeft = o.left || 0;
	});

	tween.on('end', function () {
		animate = function () { };
	});

	function animate() {
		raf(animate);
		tween.update();
	}

	animate();

	return tween;
}


function startOrEnd(index, loc, start, end) {
	if (index === loc[0]) {
		return start;
	} else if (index === loc[1]) {
		return end;
	} else {
		return null;
	}
}

function calculateOpacity(index, loc) {
	return (loc[0] <= index && loc[1] >= index) ? 1 : 0.2;
}

function getLineNumber(index) {
	return '<span class="token comment">' + padStart(index + 1, 3) + '.</span> ';
}

function calculateScrollCenter(start, end, container) {
	if (!start) return;

	end = end || start;

	const top = start.offsetTop;
	const bottom = end.offsetTop + end.offsetHeight;

	const middle = Math.floor((top + bottom) / 2);
	const height = container.offsetHeight;
	const half = height / 2;

	return middle - half;
}

const Pre = styled.pre`
	position: relative;
	text-align: center;
	overflow-y: auto;
	height: 700px;
	margin: 0;
	box-sizing: border-box;
	padding: 25% 0;
	white-space: pre-wrap;
	word-break: break-word;
	font-size: 22px;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background-color: transparent;
	}
	::-webkit-scrollbar-thumb {
		/* background-color: rgba(255,255,255,.5); */
		background-color: rgba(0,0,0,.5);
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: black;
	}

	${props => require(`raw-loader!./themes/prism-` + props.theme + `.css`).default};
`;

const Line = styled.div`
	opacity: ${props => props.opacity};
	padding-left: 2.8em;
	text-indent: -2.8em;
	padding: 2px 0px;
	margin: -1px 0px;
	background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};
`;

const Code = styled.code`
	display: inline-block;
	text-align: left;
	width: 90%;
`;

const Title = styled.h1`
	position: fixed;
	left: 50%;
	top: 20px;
	transform: translate(-50%);
	padding: 20px 40px;
	border: 10px solid hotpink;
	font-size: 3.5em;
	color: white;
	text-transform: uppercase;
	white-space: nowrap;
	font-family: 'Open Sans Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	background-color: ${props => props.backgroundColor};
	z-index: 100;
	opacity: .9;
	transition: all ease-in-out 200ms;
	:hover{
		opacity: .1;
	}
`;

const Note = styled.div`
	position: fixed;
	bottom: 30px;
	left: 50%;
	transform: translate(-50%);
	padding: 20px;
	background-color: rgba(0, 0, 20, .8);
	color: white;
	font-family: monospace;
	text-align: left;
	box-sizing: border-box;
	font-size: 22px;
`;

const Slide = (props) => {
	let { code, lang, showLineNumbers = true, ranges, theme = "synthwave84", backgroundColor } = props;

	const [active, setActive] = useState(0);
	const start = useRef(null);
	const end = useRef(null);
	const container = useRef(null);

	const range = ranges[active] || {};
	const loc = range.loc || [];

	const memoizedLines = useMemo(() => getHighlightedCodeLines(code, lang), [code, lang]);

	const lines = memoizedLines.map((line, index) => {
		let lineBackground = null;

		ranges.forEach((range)=>{
			if(index >= range.loc[0] && index <= range.loc[1]) lineBackground = range.backgroundColor;
		});

		return <Line
			key={index}
			ref={startOrEnd(index, loc, start, end)}
			dangerouslySetInnerHTML={{
				__html: showLineNumbers
					? getLineNumber(index) + line
					: line
			}}
			opacity={calculateOpacity(index, loc)}
			backgroundColor={lineBackground} />;
	});

	useEffect(() => {
		let skipAnimation = false;
		const scrollTo = calculateScrollCenter(start.current, end.current, container.current);
		scrollToElement(container.current, 0, scrollTo, {
			duration: skipAnimation ? 1 : 1000
		});
	}, [active]);

	useEffect(() => {
		function onKeyDown(e) {
			if (e.which === 38 && active > 0) {
				e.preventDefault();
				setActive(active - 1);
			} else if (e.which === 40 && active < ranges.length - 1) {
				e.preventDefault();
				setActive(active + 1);
			}
		}

		document.addEventListener('keydown', onKeyDown);
		return function cleanUp() {
			document.removeEventListener('keydown', onKeyDown);
		}
	});


	return (
		<SpectacleSlide {...props} >
			{range.title && <Title backgroundColor={backgroundColor}>{range.title}</Title>}
			<Pre theme={theme} ref={container}>
				<Code>{lines}</Code>
				{/* <code style={{ display: "inline-block", textAlign: "left" }}>test</code> */}
			</Pre>
			{range.note && <Note>{range.note}</Note>}
		</SpectacleSlide>
	)
}

export default Slide;

// If a new CSS file is added in "themes", it should have an entry here
export const Themes = {
	a11yDark: 'a11y-dark',
	atomDark: 'atom-dark',
	base16AteliersulphurpoolLight: 'base16-ateliersulphurpool.light',
	cb: 'cb',
	darcula: 'darcula',
	dracula: 'dracula',
	duotoneDark: 'duotone-dark',
	duotoneEarth: 'duotone-earth',
	duotoneForest: 'duotone-forest',
	duotoneLight: 'duotone-light',
	duotoneSea: 'duotone-sea',
	duotoneSpace: 'duotone-space',
	ghcolors: 'ghcolors',
	hopscotch: 'hopscotch',
	materialDark: 'material-dark',
	materialLight: 'material-light',
	materialOceanic: 'material-oceanic',
	pojoaque: 'pojoaque',
	shadesOfPurple: 'shades-of-purple',
	synthwave84: 'synthwave84',
	vs: 'vs',
	vscDarkPlus: 'vsc-dark-plus',
	xonokai: 'xonokai',
}