import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { uploadImageToCloudinary } from "../config/cloudinaryConfig";


export const fetchDocumentsRealtime = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  // Lắng nghe dữ liệu thay đổi trong thời gian thực
  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    // Gọi callback với dữ liệu mới nhất
    callback(documents);
  });

  // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
  return unsubscribe;
};

// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values) => {
  try {
    let newValues = { ...values };

    if (newValues.imgUrl) {
      const imgUrl = await uploadImageToCloudinary(
        newValues.imgUrl,
        collectionName
      );
      newValues.imgUrl = imgUrl;
    }

    const docRef = await addDoc(
      collection(db, collectionName),
      newValues
    );

    // ✅ return object vừa tạo (chuẩn frontend dùng)
    return {
      id: docRef.id,
      ...newValues,
    };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, values) => {

  // Xóa tài liệu khỏi Firestore
  await deleteDoc(doc(collection(db, collectionName), values.id));
};

export const updateDocument = async (collectionName, values) => {
  const { id, ...newValues } = values;
  await updateDoc(doc(collection(db, collectionName), id), newValues);
};
