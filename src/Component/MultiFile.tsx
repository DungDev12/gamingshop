import { FileInput, FileInputProps, Pill } from "@mantine/core";
import { ReactNode } from "react";

const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group className="flex !flex-nowrap overflow-hidden overflow-x-auto">
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

interface MultiFileProps {
  leftSection: ReactNode;
  label: string;
  placeholder: string;
  onChange: (files: File[]) => void;
}

const MultiFile: React.FC<MultiFileProps> = ({
  leftSection,
  label,
  placeholder,
  onChange,
}) => {
  return (
    <FileInput
      leftSection={leftSection}
      label={label}
      placeholder={placeholder}
      multiple
      clearable
      valueComponent={ValueComponent}
      onChange={onChange}
    />
  );
};

export default MultiFile;
