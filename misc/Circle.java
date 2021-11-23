public class Circle {
    
    public static int count;                        // Static attribute. The Circle class itself has the only copy. 
    
    public int width;                               // Normal attribute. Each instance has its own copy.
    public String color;                            // Normal attribute. Each instance has its own copy.
    
    public Circle(int width, String color) {        // Constructor. Some languages actually call this "constructor" but in Java, you just define a method whose name matches the class's name.
        this.width = width;                         // "this" means the instance that is being constructed.
        this.color = color;                         // The constructor's job is to install values into the instance...
        Circle.count ++;                            // ...and to update the count of circles.
    }
    
    public void print() {                           // Normal method. You call this using an instance.
        System.out.println("I am a circle, " + this.width + " and " + this.color + "!");
    }
    
    public static void printCount() {               // Static method. You call this using the class itself, and it can only refer to static attributes.
        System.out.println("There are " + Circle.count + " circles.");
    }
    
    public static void main(String args[]) {

        Circle circle1 = new Circle(10, "blue");    // Create three instances of Circle
        Circle circle2 = new Circle(20, "red");
        Circle circle3 = new Circle(30, "green");

        Circle.printCount();                        // Call static method to print the number of Circle instances

        circle1.print();                            // Call instance method to print the details of each instance
        circle2.print();
        circle3.print();
        
        Circle circle4 = new Circle(40, "purple");
        Circle circle5 = new Circle(50, "yellow");

        Circle.printCount();                        // Call static method to print the number of Circle instances

        circle4.print();                            // Call instance method to print the details of each instance
        circle5.print();

    } 
}
