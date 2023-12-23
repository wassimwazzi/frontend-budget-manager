import api from '../api';

const handleDownload = (url, filename) => {
    api
        .get(url)
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Use the filename from the Content-Disposition header if available
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match.length === 2) {
                    filename = match[1];
                }
            }

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading file:', error.response);
        });
};

export default handleDownload;

