const firebase = require("firebase-admin");

firebase.initializeApp({
	credential: firebase.credential.applicationDefault()
});
const db = firebase.firestore();

const collection = db.collection("languages")

async function getAllLanguages(_req, res) {
	try {
		const languagesQuery = await collection.get();
		const languages = [];

		languagesQuery.forEach(item => {
			const data = item.data();
			languages.push({id: data.id, name: data.name})
		});

		return res.json({
			success: true,
			data: languages
		});
	}catch(error) {
		return res.status(500).json({ success: false, error: error });
	}
}

async function getLanguage(req, res) {
	const requiredLang = req.params.language;

	const lang = await collection.where('id', '==', requiredLang).get();
	const exists = lang.length > 0;

	return res
		.status(exists ? 200 : 404)
		.json({
			success: exists,
			data: exists ? lang[0] : "Language not found"
		})
}

async function addLanguage(req, res) {
	const { id, name } = req.body;
	const data = {
		id: id,
		name: name
	}

	const ref = await collection.add(data);
	const item = await ref.get();

	return res.status(200).json({id: item.id, name: item.name});
}

module.exports = {
	getAllLanguages,
	getLanguage,
	addLanguage,
};
