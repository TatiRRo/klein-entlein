import { names } from '../constants/constants';
import {
	actionsWquestions,
	actionsYesNoQuestions,
	statements,
} from '../constants/sentence-structure';
import { shuffle } from '../utils/utils';

export function buildExercise(sentence, level) {
	const tokens = sentence
		.replace(/([,.!?;:])/g, ' $1')
		.split(/\s+/)
		.filter(Boolean);
	const scrambled =
		level === 'B2'
			? shuffle(
					tokens.slice(0, Math.max(3, Math.ceil(tokens.length * 0.7)))
			  ).concat(tokens.slice(Math.ceil(tokens.length * 0.7)))
			: shuffle(tokens);
	return { id: nextId(), correct: sentence, tokens: scrambled };
}

export function genFragesaetze(n, level) {
	const list = [];
	while (list.length < n) {
		const isYesNo = Math.random() < 0.5; // 50% шанс
		const action = isYesNo
			? actionsYesNoQuestions[
					Math.floor(Math.random() * actionsYesNoQuestions.length)
			  ]
			: actionsWquestions[Math.floor(Math.random() * actionsWquestions.length)];
		const n1 = names[(Math.random() * names.length) | 0];

		let sentence = '';

		if (isYesNo) {
			// Ja/Nein Frage: Aux + Name + Object/Place/Time + Participle
			sentence =
				`${action.aux} ${n1} ${action.object} ${action.place} ${action.time} ${action.participle}`
					.replace(/\s+/g, ' ')
					.trim() + '?';
		} else {
			// W-Frage: Fragewort + Aux + Name + Object/Place/Time + Participle
			sentence =
				`${action.type} ${action.aux} ${n1} ${action.reflexive || ''} ${
					action.object
				} ${action.place} ${action.time} ${action.participle}`
					.replace(/\s+/g, ' ')
					.trim() + '?';
		}

		list.push(buildExercise(sentence, level));
	}
	return list;
}

// // shuffle
// function shuffle(array) {
// 	return array.sort(() => Math.random() - 0.5);
// }

// id generator
let idCounter = 0;
function nextId() {
	return idCounter++;
}

export function genAussagesaetze(n, level) {
	const list = [];
	while (list.length < n) {
		const s = statements[Math.floor(Math.random() * statements.length)];
		const sentence =
			`${s.subject} ${s.aux} ${s.reflexive || ''} ${s.object} ${s.place} ${
				s.time
			} ${s.participle}`
				.replace(/\s+/g, ' ')
				.trim() + '.';

		list.push(buildExercise(sentence, level));
	}
	return list;
}
