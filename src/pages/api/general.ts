import { withOGImage } from 'next-api-og-image';

export enum GeneralQueryEnum {
  'logo',
  'siteName',
  'description',
  'theme',
  'templateTitle',
  'logoWidth',
  'logoHeight',
}

export default withOGImage<'query', keyof typeof GeneralQueryEnum>({
  template: {
    html: async ({
      siteName,
      description,
      logo,
      theme,
      templateTitle,
      logoWidth,
      logoHeight,
    }) => {
      const query = {
        siteName: siteName ?? 'Site Name',
        description: description ?? 'Description',
        logo: logo ?? 'https://towedd.com/favicon/logo.png',
        theme: theme ?? 'dark',
        templateTitle,
        logoWidth: logoWidth ?? '450',
        logoHeight: logoHeight ?? '450',
      };

      return `
        <html>
          <head>
            ${getStyle(query)}
          </head>
          <body>
            <div class="container">
              <img src="${query.logo}" alt="Favicon" />
              ${
                query.templateTitle
                  ? `<h1>${query.templateTitle}</h1>
                  <h3>${query.siteName}</h3>`
                  : `<h1>${query.siteName}</h1>`
              }
              
              <p class="description">${query.description}</p>
            </div>
          </body>
        </html>
      `;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStyle = (
  query: Record<keyof typeof GeneralQueryEnum, string | string[]>
) => `
<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url('/fonts/inter-var-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-image: radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%);
    background-size: 100px 100px;
    height: 100vh;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .container {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: ${query.theme === 'dark' ? 'white' : 'black'};

    text-align: center;
    padding: 0 5rem;
  }

  img {
    width: ${query.logoWidth}px;
    object-fit: cover;
    ${query.logoHeight && `height: ${query.logoHeight}px`}
  }

  h1 {
    font-size: 1.2rem;
    line-height: 1.1;
    margin-top: 1.3rem;
  }

  h3 {
    margin-top: 0.5rem;
    color: ${query.theme === 'dark' ? '#E5E7EB' : '#374151'};
    font-size: 1.2rem;
  }
  
  .description {
    font-size: 1.4rem;
    line-height: 1.5;
    margin-top: 1rem;
    color: ${query.theme === 'dark' ? '#D1D5DB' : '#1F2937'};
  }
</style>
`;
