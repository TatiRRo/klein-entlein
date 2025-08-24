import { genAussagesaetze, genFragesaetze } from './satz-exercises';

import { TOP100_UNREGELMÄSSIGE_VERBEN } from '../constants/topverben';
import {
	VERB_GR1,
	VERB_GR10,
	VERB_GR11,
	VERB_GR12,
	VERB_GR13,
	VERB_GR2,
	VERB_GR3,
	VERB_GR4,
	VERB_GR5,
	VERB_GR6,
	VERB_GR7,
	VERB_GR8,
	VERB_GR9,
} from '../constants/verb-gruppen';

type SatzbauSection = {
	key: string;
	title: string;
	gen: (n: number, level: string) => any[];
};

type VerbSection = {
	key: string;
	title: string;
	type: 'verb';
	exercises: {
		id: string;
		infinitiv: string;
		translation: string;
		prateritum: string[];
		partizip2: string;
	}[];
};

type Section = SatzbauSection | VerbSection;

type Category = {
	key: string;
	title: string;
	sections: Section[];
};

export const CATEGORIES: Category[] = [
	{
		key: 'satzbau',
		title: 'Satzbau',
		sections: [
			{ key: 'fragen', title: 'Fragesätze', gen: genFragesaetze },
			{ key: 'aussage', title: 'Aussagesätze', gen: genAussagesaetze },
			// { key: 'nebensatz', title: 'Nebensätze', gen: genNebensaetze },
			// {
			// 	key: 'angaben',
			// 	title: 'Порядок обстоятельств (TMP)',
			// 	gen: genAngabenErgaenzungen,
			// },

			// { key: 'kausal', title: 'Kausalsätze', gen: genKausalsaetze },
			// { key: 'nicht', title: 'Позиция „nicht“', gen: genNichtPosition },
			// { key: 'konnektoren', title: 'Konnektoren', gen: genKonnektoren },
			// { key: 'imperativ', title: 'Imperativ', gen: genImperativsaetze },
		],
	},
	{
		key: 'partizip2',
		title: 'Partizip II',
		sections: [
			{
				key: 'top100',
				title: 'TOP unregelmäßigen Verben',
				type: 'verb',
				exercises: TOP100_UNREGELMÄSSIGE_VERBEN,
			},
			{
				key: 'ei-i-i',
				title: 'Vokalwechsel ei–i–i(1)',
				type: 'verb',
				exercises: VERB_GR1,
			},
			{
				key: 'ei-ie-ie',
				title: 'Vokalwechsel ei–ie–ie(2)',
				type: 'verb',
				exercises: VERB_GR2,
			},
			{
				key: 'i-a–u',
				title: 'Vokalwechsel i-a–u(3)',
				type: 'verb',
				exercises: VERB_GR3,
			},
			{
				key: 'i/ä/o -a',
				title: 'Vokalwechsel i/ä/o-a- o(4)',
				type: 'verb',
				exercises: VERB_GR4,
			},
			{
				key: 'a-u-a',
				title: 'Vokalwechsel a-u-a(5)',
				type: 'verb',
				exercises: VERB_GR5,
			},
			{
				key: 'ie/e/ü -o-o',
				title: 'Vokalwechsel ie/e/ü-o-o(6)',
				type: 'verb',
				exercises: VERB_GR6,
			},
			{
				key: 'e-a-e',
				title: 'Vokalwechsel e-a-e(7)',
				type: 'verb',
				exercises: VERB_GR7,
			},
			{
				key: 'e-a-o',
				title: 'Vokalwechsel e-a-o(8)',
				type: 'verb',
				exercises: VERB_GR8,
			},
			{
				key: 'a/ä/e - i/ie-a',
				title: 'Vokalwechsel a/ä/e--i/ie--a(9)',
				type: 'verb',
				exercises: VERB_GR9,
			},
			{
				key: 'u/au - ie/a - u/a/u',
				title: 'Vokalwechsel u/au--ie/a--u/a/u(10)',
				type: 'verb',
				exercises: VERB_GR10,
			},
			{
				key: 'i/ie - a - e',
				title: 'Vokalwechsel i/ie--a--e(11)',
				type: 'verb',
				exercises: VERB_GR11,
			},
			{
				key: 'e/ị - a - a',
				title: 'Vokalwechsel e/ị--a--a(12)',
				type: 'verb',
				exercises: VERB_GR12,
			},
			{
				key: 'Sonderformen',
				title: 'Sonderformen(13)',
				type: 'verb',
				exercises: VERB_GR13,
			},
		],
	},
	// В РАБОТЕ
	// {
	// 	key: 'plusquamperfekt',
	// 	title: 'Plusquamperfekt',
	// 	sections: [
	// 		{
	// 			key: 'plusquamperfekt',
	// 			title: 'Plusquamperfekt mit Konnektoren',
	// 			type: 'verb-gap',
	// 			gen: genPlusquamperfekt,
	// 		},
	// 	],
	// },
];

// Вспомогательный список всех разделов для TeacherDashboard
export const SECTIONS = CATEGORIES.flatMap((c) => c.sections);
