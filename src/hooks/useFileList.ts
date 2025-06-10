import { useState, useEffect } from 'react';

export interface FileListResponse {
  files: string[];
}

export const useFileList = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/sample-data/files.json');
        if (!response.ok) {
          throw new Error('Failed to fetch file list');
        }
        const data: FileListResponse = await response.json();
        setFiles(data.files);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return { files, loading, error };
}; 