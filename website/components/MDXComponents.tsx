import Image from 'next/image';
import { useState } from 'react';
import reactToText from 'react-to-text';
import { useCopyToClipboard } from 'react-use';

import { CustomFigure, FullWidthImage, ExternalLink, InternalLink, Alert, Parameters, Panel, Parameter, Signature } from '.';

type MDXComponentProps<TAttribute, TElement> = React.DetailedHTMLProps<TAttribute, TElement> & {
  children: React.ReactElement;
};

function CustomLink(
  props: MDXComponentProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  const { href, children } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
  const containsImage = children?.props?.originalType;
  const LinkComponent = isInternalLink ? InternalLink : ExternalLink;

  if (containsImage) {
    const { alt, src } = children?.props;

    return (
      <CustomFigure alt={alt}>
        <LinkComponent {...props}>
          <FullWidthImage alt={alt} src={src} />
        </LinkComponent>
      </CustomFigure>
    );
  }

  return (
    <LinkComponent
      {...props}
    />
  );
}

function CustomEmphasis(props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return <em {...props} />;
}

function CustomHeading2(
  props: MDXComponentProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
) {
  return (
    <h2
      {...props}
    />
  );
}

function CustomHeading3(
  props: MDXComponentProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
) {
  return (
    <h3
      {...props}
    />
  );
}

function CustomHeading4(
  props: MDXComponentProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
) {
  return (
    <h4
      {...props}
    />
  );
}

function CustomImage({
  src,
  alt,
}: MDXComponentProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return (
    <CustomFigure alt={alt}>
      <FullWidthImage alt={alt} src={src} />
    </CustomFigure>
  );
}

function CustomInlineCode(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return (
    <code {...props} />
  );
}

function CustomKeyboardInput(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return (
    <kbd
      {...props}
    />
  );
}

function CustomPreformattedText(
  props: MDXComponentProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>
) {
  const code = reactToText(props.children);
  const DEFAULT_TEXT = 'Copy';

  const [buttonText, setButtonText] = useState(DEFAULT_TEXT);
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          copyToClipboard(code);

          const label = state.error ? "Couldn't copy, try manually" : 'Copied!';
          setButtonText(label);

          setTimeout(() => {
            setButtonText(DEFAULT_TEXT);
          }, 1000);
        }}
      >
        {buttonText}
      </button>
      <pre {...props} />
    </>
  );
}

function CustomStrong(props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return <strong {...props} />;
}

function CustomTable(
  props: MDXComponentProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
) {
  return <table {...props} />;
}

function CustomTableHeader(
  props: MDXComponentProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
) {
  return <thead {...props} />;
}

function CustomTableHeaderCell(
  props: MDXComponentProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >
) {
  return <th {...props} />;
}

function CustomTableDataCell(
  props: MDXComponentProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >
) {
  return <td {...props} />;
}

function CustomTableRow(
  props: MDXComponentProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
) {
  return <tr {...props} />;
}

function CustomParagraph(
  props: MDXComponentProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
) {
  return <p {...props} />;
}

function CustomUnorderedList(
  props: MDXComponentProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
) {
  return <ul {...props} />;
}

function CustomUnorderedListItem(
  props: MDXComponentProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
) {
  return (
    <li
      {...props}
    />
  );
}

function CustomOrderedList(
  props: MDXComponentProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
) {
  return <ol className="mt-6 text-gray-300 text-opacity-80 list-counter-reset" {...props} />;
}

function CustomOrderedListItem(
  props: MDXComponentProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
) {
  return (
    <li
      className="relative ml-6 list-counter-increment after:list-counter-result after:absolute after:block after:text-sm after:left-0 after:top-0 after:mt-0.5 after:-ml-6 after:leading-loose after:text-gray-600"
      {...props}
    />
  );
}

export const MDXComponents = {
  Alert,
  Image,
  Parameters,
  Panel,
  Parameter,
  Signature,
  a: CustomLink,
  em: CustomEmphasis,
  h2: CustomHeading2,
  h3: CustomHeading3,
  h4: CustomHeading4,
  img: CustomImage,
  inlineCode: CustomInlineCode,
  kbd: CustomKeyboardInput,
  ol: CustomOrderedList,
  'ol.li': CustomOrderedListItem,
  p: CustomParagraph,
  pre: CustomPreformattedText,
  strong: CustomStrong,
  table: CustomTable,
  td: CustomTableDataCell,
  th: CustomTableHeaderCell,
  thead: CustomTableHeader,
  tr: CustomTableRow,
  ul: CustomUnorderedList,
  'ul.li': CustomUnorderedListItem,
};
