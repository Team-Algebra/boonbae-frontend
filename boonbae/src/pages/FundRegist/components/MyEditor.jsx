import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = ({ onIntroductionChange }) => {
    const handleIntroductionChange = (content) => {
        onIntroductionChange(content);
    };

    return (
        <div>
            <ReactQuill
                onChange={handleIntroductionChange}
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' },
                        ],
                        ['link', 'image'],
                        ['clean'],
                    ],
                }}
            />
        </div>
    );
};

export default MyEditor;