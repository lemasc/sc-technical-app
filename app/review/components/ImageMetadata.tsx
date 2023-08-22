import {
  APEX_FNumber,
  APEX_ShutterSpeedValue,
  ExifMetadataType,
} from "../ExifMetadata";

export const ImageMetadata = ({ metadata }: { metadata: ExifMetadataType }) => {
  return (
    <div className="flex flex-col flex-grow justify-end text-sm flex-shrink-0">
      <div className="grid grid-cols-[max-content,1fr] gap-2 py-4">
        <b>Camera Make:</b>
        <span>{metadata.Make}</span>
        <b>Camera Model:</b>
        <span>{metadata.Model}</span>
        <b className="mr-1">Date Time Taken:</b>
        <span>{metadata.DateTimeOriginal.toLocaleString()}</span>
        <b>Aperture:</b>
        <span>{APEX_FNumber(metadata.FNumber)}</span>
        <b>Shutter Speed:</b>
        <span>{APEX_ShutterSpeedValue(metadata.ShutterSpeedValue)}</span>
        <b>ISO:</b>
        <span>{metadata.ISOSpeedRatings}</span>
        {metadata.Software && (
          <>
            <b>Software:</b>
            <span>{metadata.Software}</span>
          </>
        )}
      </div>
    </div>
  );
};
