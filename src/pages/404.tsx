import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom404(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <div>404</div>;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
  },
});
