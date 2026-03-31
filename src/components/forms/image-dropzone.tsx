'use client';

import { Button } from '@/components/ui/button';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '@/lib/schemas/upload-form.schema';
import { cn } from '@/lib/utils';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

type FileError = {
  file: string;
  message: string;
};

type ImageDropzoneProps = {
  value: File[];
  onChange: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
};

export function ImageDropzone({
  value,
  onChange,
  multiple = false,
  maxFiles = 1,
  disabled = false,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileErrors, setFileErrors] = useState<FileError[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const canAddMore = value.length < maxFiles;

  const validateAndAdd = useCallback(
    (incoming: File[]) => {
      const errors: FileError[] = [];
      const valid: File[] = [];

      for (const file of incoming) {
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          errors.push({
            file: file.name,
            message: 'Only .jpg, .png, and .webp are supported',
          });
        } else if (file.size > MAX_FILE_SIZE_BYTES) {
          errors.push({
            file: file.name,
            message: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
          });
        } else {
          valid.push(file);
        }
      }

      setFileErrors(errors);

      if (valid.length === 0) return;

      const next = multiple
        ? [...value, ...valid].slice(0, maxFiles)
        : valid.slice(0, 1);

      // Revoke old previews to avoid memory leaks
      previews.forEach(URL.revokeObjectURL);

      const newPreviews = next.map((f) => URL.createObjectURL(f));
      setPreviews(newPreviews);
      onChange(next);
    },
    [value, multiple, maxFiles, onChange, previews],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    validateAndAdd(Array.from(e.target.files));
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || !canAddMore) return;
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/'),
    );
    if (files.length > 0) validateAndAdd(files);
  }

  function handleRemove(index: number) {
    URL.revokeObjectURL(previews[index]);
    const nextFiles = value.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    setPreviews(nextPreviews);
    onChange(nextFiles);
    setFileErrors([]);
  }

  return (
    <div className="space-y-3">
      {/* Dropzone area */}
      {canAddMore && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            Click or drag images here
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            JPG, PNG, WebP — max {MAX_FILE_SIZE_MB}MB
            {multiple && ` — up to ${maxFiles} files`}
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* File errors */}
      {fileErrors.length > 0 && (
        <div className="space-y-1">
          {fileErrors.map((err) => (
            <p key={err.file} className="text-sm text-destructive">
              {err.file}: {err.message}
            </p>
          ))}
        </div>
      )}

      {/* Preview grid */}
      {previews.length > 0 && (
        <div
          className={cn(
            'grid gap-3',
            multiple ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1',
          )}
        >
          {previews.map((src, index) => (
            <div key={src} className="group relative">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
                <Image
                  src={src}
                  alt={value[index]?.name ?? `Preview ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {value[index]?.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
