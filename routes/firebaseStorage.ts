import { Request, Response, Router } from "express";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import multer from "multer";
import config from "../middlewares/firebase";

const router = Router();

initializeApp(config.firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/:id",
  upload.single("filename"),
  async (req: Request, res: Response) => {
    try {
      const storageRef = ref(
        storage,
        `${req.params.id}/${req.file!.originalname}`
      );

      const metadata = {
        contentType: req.file!.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file!.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      return res.send({
        message: "Archivo subido correctamente",
        name: req.file!.originalname,
        type: req.file!.mimetype,
        downloadURL: downloadURL,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

router.post(
  "/perfiles",
  upload.single("filename"),
  async (req: Request, res: Response) => {
    try {
      const storageRef = ref(storage, `perfiles/${req.file!.originalname}`);

      const metadata = {
        contentType: req.file!.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file!.buffer,
        metadata
      );

      return res.send({
        message: "Archivo subido correctamente",
        exito: true,
      });
    } catch (error) {
      return res.status(400).send({ error, exito: false });
    }
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const folderRef = ref(storage, id);

    const { items } = await listAll(folderRef);

    const files = await Promise.all(
      items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        const metadata = await getMetadata(item);

        return {
          name: item.name,
          downloadURL: downloadURL,
          contentType: metadata.contentType,
          size: metadata.size,
          created: metadata.timeCreated,
          updated: metadata.updated,
        };
      })
    );

    return res.json({ exito: true, files });
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    return res
      .status(500)
      .json({ exito: false, error: "Error interno del servidor" });
  }
});

router.delete("/:id/:fileName", async (req: Request, res: Response) => {
  try {
    const folderId = req.params.id;
    const fileName = req.params.fileName;

    const fileRef = ref(storage, `${folderId}/${fileName}`);

    await deleteObject(fileRef);

    return res.json({ exito: true });
  } catch (error) {
    return res
      .status(500)
      .json({ exito: false, error: "Error interno del servidor" });
  }
});

export default router;
