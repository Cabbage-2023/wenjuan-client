import Head from "next/head";

type PropType = {
  info: string;
}

export default function About(props: PropType) {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="About page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>About</h1>
        <p>{props.info}</p>
      </main>
    </div>
  );
}
