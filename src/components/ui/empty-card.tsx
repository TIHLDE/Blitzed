import { Card, CardDescription, CardHeader, CardTitle } from "./card";

export interface EmptyCardProps {
  title: string;
  description: string;
}

export const EmptyCard = ({ description, title }: EmptyCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
