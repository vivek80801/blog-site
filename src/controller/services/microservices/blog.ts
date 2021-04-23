import multer from "multer";
import path from "path";

const stroage = multer.diskStorage({
	destination: "./public/upload/",
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

const checkFileType = (
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const fileTypes = /jpeg|png|jpg/;
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extname) {
		return cb(null, true);
	} else {
		cb({ message: "file is not an image", name: "Error" });
	}
};

export const upload = multer({
	storage: stroage,
	limits: { fileSize: 100000 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
}).single("blogImage");